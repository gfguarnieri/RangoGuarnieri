import { RangoDataSource } from 'shared/infra/typeorm/connection'
import { z } from '@zod/i18n'
import { RepositoryError } from 'shared/errors/RepositoryError'
import { IProductSaleRepository } from 'domain/product/repositories/IProductSaleRepository'
import { ICreateProductSaleDTO } from 'domain/product/dtos/ICreateProductSaleDTO'
import { ProductSale } from 'domain/product/entities/ProductSale'
import { IUpdateProductSaleDTO } from 'domain/product/dtos/IUpdateProductSaleDTO'

export class ProductSaleRepository implements IProductSaleRepository {
  async update(
    id: string,
    sale: IUpdateProductSaleDTO,
  ): Promise<ProductSale | undefined> {
    const query = await RangoDataSource.query(
      `UPDATE product_sale 
                SET description = $1, promotion_price = $2, is_active = $3
                WHERE id = $4
                RETURNING id`,
      [sale.description, sale.promotionPrice, sale.active, id],
    )

    const rowsAffected = query[1]

    if (rowsAffected === 0) {
      return undefined
    }

    const productSaleUpdated = new ProductSale(sale, id)

    return productSaleUpdated
  }

  async listByProductId(productId: string): Promise<ProductSale[]> {
    const rows = (await RangoDataSource.query(
      `SELECT
            ps.id,
            ps.product_id as "productId",
            ps.description,
            ps.promotion_price as "promotionPrice",
            ps.is_active as "active",
            json_agg(
            json_build_object(
                'id', psd.id,
                'dayOfWeek', psd.day_of_week,
                'openingTime', psd.opening_time,
                'closingTime', psd.closing_time
            )
            ) as "productSaleDay"
        FROM product_sale ps
        LEFT JOIN product_sale_day psd ON ps.id = psd.product_sale_id
        WHERE ps.product_id = $1
        GROUP BY ps.id`,
      [productId],
    )) as ProductSale[]

    return rows
  }

  async findById(id: string): Promise<ProductSale | undefined> {
    const rows = await RangoDataSource.query(
      `SELECT
            ps.id,
            ps.product_id as "productId",
            ps.description,
            ps.promotion_price as "promotionPrice",
            ps.is_active as "active",
            json_agg(
            json_build_object(
                'id', psd.id,
                'dayOfWeek', psd.day_of_week,
                'openingTime', psd.opening_time,
                'closingTime', psd.closing_time
            )
            ) as "productSaleDay"
        FROM product_sale ps
        LEFT JOIN product_sale_day psd ON ps.id = psd.product_sale_id
        WHERE ps.id = $1
        GROUP BY ps.id`,
      [id],
    )

    if (rows.length === 0) {
      return undefined
    }

    return rows[0] as ProductSale
  }

  async getActiveSale(productId: string): Promise<ProductSale | undefined> {
    const rows = await RangoDataSource.query(
      `SELECT
            ps.id,
            ps.product_id as "productId",
            ps.description,
            ps.promotion_price as "promotionPrice",
            ps.is_active as "active",
            json_agg(
            json_build_object(
                'id', psd.id,
                'dayOfWeek', psd.day_of_week,
                'openingTime', psd.opening_time,
                'closingTime', psd.closing_time
            )
            ) as "productSaleDay"
        FROM product_sale ps
        LEFT JOIN product_sale_day psd ON ps.id = psd.product_sale_id
        WHERE ps.product_id = $1 AND ps.is_active = true
        GROUP BY ps.id`,
      [productId],
    )

    if (rows.length === 0) {
      return undefined
    }

    return rows[0] as ProductSale
  }

  async delete(productId: string, productSaleId: string): Promise<void> {
    const query = await RangoDataSource.query(
      `DELETE FROM product_sale WHERE product_id = $1 AND id = $2`,
      [productId, productSaleId],
    )
    const rowsAffected = query[1]

    if (rowsAffected === 0) {
      throw new RepositoryError('Error deleting product sale')
    }
  }

  async active(productId: string, productSaleId: string): Promise<void> {
    const query = await RangoDataSource.query(
      `UPDATE product_sale
        SET is_active = true
        WHERE product_id = $1 AND id = $2`,
      [productId, productSaleId],
    )
    const rowsAffected = query[1]

    if (rowsAffected === 0) {
      throw new RepositoryError('Error activating product sale')
    }
  }

  async inactive(productId: string, productSaleId: string): Promise<void> {
    const query = await RangoDataSource.query(
      `UPDATE product_sale
        SET is_active = false
        WHERE product_id = $1 AND id = $2`,
      [productId, productSaleId],
    )
    const rowsAffected = query[1]

    if (rowsAffected === 0) {
      throw new RepositoryError('Error inactivating product sale')
    }
  }

  async inactiveAll(productId: string): Promise<void> {
    await RangoDataSource.query(
      `UPDATE product_sale
        SET is_active = false
        WHERE product_id = $1`,
      [productId],
    )
  }

  async create(productSale: ICreateProductSaleDTO): Promise<ProductSale> {
    const query = await RangoDataSource.query(
      `INSERT INTO product_sale 
              (product_id, description, promotion_price, is_active) 
              VALUES ($1, $2, $3, $4) RETURNING id`,
      [
        productSale.productId,
        productSale.description,
        productSale.promotionPrice,
        productSale.active,
      ],
    )
    const resultSchema = z.array(
      z.object({
        id: z.string(),
      }),
    )

    const result = resultSchema.safeParse(query)

    if (!result.success) {
      throw new RepositoryError('Error creating product sale')
    }

    const [row] = result.data

    const productSaleCreated = new ProductSale(productSale, row.id)

    return productSaleCreated
  }
}
