import { ICreateProductDTO } from 'domain/product/dtos/ICreateProductDTO'
import { IProduct } from 'domain/product/models/IProduct'
import { IProductRepository } from 'domain/product/repositories/IProductRepository'
import { RangoDataSource } from 'shared/infra/typeorm/connection'
import { z } from '@zod/i18n'
import { RepositoryError } from 'shared/errors/RepositoryError'
import { Product } from 'domain/product/entities/Product'

export class ProductRepository implements IProductRepository {
  async create(product: ICreateProductDTO): Promise<IProduct> {
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

  async list(): Promise<IProduct[]> {
    const products = (await RangoDataSource.query(
      `SELECT 
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
            p.name,
            p.description,
            p.price,
            p.image,
            p.created_at as "createdAt",
            p.updated_at as "updatedAt"
        FROM product p
        LEFT JOIN category c ON p.category_id = c.id
        ORDER BY c.name, p.name
        `,
    )) as IProduct[]

    return products
  }

  async findById(id: string): Promise<IProduct | undefined> {
    const rows = await RangoDataSource.query(
      `SELECT 
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
            p.name,
            p.description,
            p.price,
            p.image,
            p.created_at as "createdAt",
            p.updated_at as "updatedAt"
        FROM product p
        LEFT JOIN category c ON p.category_id = c.id
        WHERE p.id = $1`,
      [id],
    )

    if (rows.length === 0) {
      return undefined
    }
    return rows[0] as IProduct
  }

  async listByCategoryId(categoryId: string): Promise<IProduct[]> {
    const rows = (await RangoDataSource.query(
      `SELECT 
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
            p.name,
            p.description,
            p.price,
            p.image,
            p.created_at as "createdAt",
            p.updated_at as "updatedAt"
        FROM product p
        LEFT JOIN category c ON p.category_id = c.id
        WHERE p.category_id = $1
        ORDER BY c.name, p.name
        `,
      [categoryId],
    )) as IProduct[]

    return rows
  }

  async listByRestaurantId(restaurantId: string): Promise<IProduct[]> {
    const rows = (await RangoDataSource.query(
      `SELECT 
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
            p.name,
            p.description,
            p.price,
            p.image,
            p.created_at as "createdAt",
            p.updated_at as "updatedAt"
        FROM product p
        LEFT JOIN category c ON p.category_id = c.id
        WHERE p.restaurant_id = $1
        ORDER BY c.name, p.name
        `,
      [restaurantId],
    )) as IProduct[]

    return rows
  }

  async update(id: string, data: IProduct): Promise<IProduct | undefined> {
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
}
