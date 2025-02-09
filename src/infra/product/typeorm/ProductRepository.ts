import { ICreateProductDTO } from 'domain/product/dtos/ICreateProductDTO'
import { IProductRepository } from 'domain/product/repositories/IProductRepository'
import { RangoDataSource } from 'shared/infra/typeorm/connection'
import { z } from '@zod/i18n'
import { RepositoryError } from 'shared/errors/RepositoryError'
import { Product } from 'domain/product/entities/Product'

export class ProductRepository implements IProductRepository {
  async exists(id: string): Promise<boolean> {
    const rows = await RangoDataSource.query(
      `SELECT 1 FROM product WHERE id = $1 LIMIT 1`,
      [id],
    )
    return rows.length > 0
  }

  async create(product: ICreateProductDTO): Promise<Product> {
    const query = await RangoDataSource.query(
      `INSERT INTO product 
              (restaurant_id, category_id, name, description, price, image) 
              VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`,
      [
        product.restaurantId,
        product.categoryId,
        product.name,
        product.description,
        product.price,
        product.image,
      ],
    )
    const resultSchema = z.array(
      z.object({
        id: z.string(),
      }),
    )

    const result = resultSchema.safeParse(query)

    if (!result.success) {
      throw new RepositoryError('Error creating product')
    }

    const [row] = result.data

    const productCreated = new Product(product, row.id)

    return productCreated
  }

  async list(): Promise<Product[]> {
    const products = (await RangoDataSource.query(
      this.getQueryProduct(''),
    )) as Product[]

    return products
  }

  async findById(id: string): Promise<Product | undefined> {
    const rows = await RangoDataSource.query(
      this.getQueryProduct('p.id = $1'),
      [id],
    )

    if (rows.length === 0) {
      return undefined
    }

    const product = rows[0] as Product

    product.price = Number(product.price)

    return product
  }

  async listByCategoryId(categoryId: string): Promise<Product[]> {
    let rows = (await RangoDataSource.query(
      this.getQueryProduct(`p.category_id = $1`),
      [categoryId],
    )) as Product[]

    rows = rows.map((product) => {
      product.price = Number(product.price)
      return product
    })

    return rows
  }

  async listByRestaurantId(restaurantId: string): Promise<Product[]> {
    const rows = (await RangoDataSource.query(
      this.getQueryProduct('p.restaurant_id = $1'),
      [restaurantId],
    )) as Product[]

    return rows
  }

  async update(id: string, data: Product): Promise<Product | undefined> {
    const query = await RangoDataSource.query(
      `UPDATE product 
        SET name = $1, description = $2, price = $3, updated_at = NOW()
        WHERE id = $4
        RETURNING id`,
      [data.name, data.description, data.price, id],
    )

    const rowsAffected = query[1]

    if (rowsAffected === 0) {
      throw new RepositoryError('Product not found')
    }

    const productUpdated = new Product(data, id)
    return productUpdated
  }

  async delete(id: string): Promise<void> {
    const query = await RangoDataSource.query(
      `DELETE FROM product WHERE id = $1`,
      [id],
    )
    const rowsAffected = query[1]
    if (rowsAffected === 0) {
      throw new RepositoryError('Product not found')
    }
  }

  private getQueryProduct(filter: string) {
    return `
    SELECT 
          p.id,
          p.restaurant_id as "restaurantId",
          p.category_id as "categoryId",
          json_build_object(
              'id', c.id, 
              'name', c.name,
              'createdAt', c.created_at,
              'updatedAt', c.updated_at,
              'restaurantId', c.restaurant_id
          ) as "category",
          CASE
              WHEN sale.id IS NOT NULL THEN
                  json_build_object(
                      'id', sale.id,
                      'description', sale.description,
                      'promotionPrice', sale.promotion_price,
                      'isActive', sale.is_active,
                      'productSaleDay', COALESCE(
                          json_agg(
                              json_build_object(
                                  'id', rd.id,
                                  'dayOfWeek', rd.day_of_week,
                                  'openingTime', rd.opening_time,
                                  'closingTime', rd.closing_time
                              ) 
                          )FILTER (WHERE rd.id IS NOT NULL),'[]'::json
                      )
                  )
              ELSE NULL
          END as "productSale",
          p.name,
          p.description,
          p.price,
          p.image,
          p.created_at as "createdAt",
          p.updated_at as "updatedAt"
      FROM product p
      LEFT JOIN category c ON p.category_id = c.id
      LEFT JOIN product_sale sale ON p.id = sale.product_id  AND sale.is_active = TRUE
      LEFT JOIN product_sale_day rd ON sale.id = rd.product_sale_id
      ${filter ? 'WHERE ' + filter + ' ' : ''}
      GROUP BY p.id, c.id, sale.id
      ORDER BY c.name, p.name
    
    `
  }
}
