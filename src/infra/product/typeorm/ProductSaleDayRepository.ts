import { RangoDataSource } from 'shared/infra/typeorm/connection'
import { RepositoryError } from 'shared/errors/RepositoryError'
import { IProductSaleDayRepository } from 'domain/product/repositories/IProductSaleDayRepository'
import { ICreateProductSaleDayDTO } from 'domain/product/dtos/ICreateProductSaleDayDTO'
import { ProductSaleDay } from 'domain/product/entities/ProductSaleDay'

export class ProductSaleDayRepository implements IProductSaleDayRepository {
  async create(saleDay: ICreateProductSaleDayDTO): Promise<ProductSaleDay> {
    const query = await RangoDataSource.query(
      `INSERT INTO product_sale_day 
              (product_sale_id, day_of_week, opening_time, closing_time) 
              VALUES ($1, $2, $3, $4) RETURNING id`,
      [
        saleDay.productSaleId,
        saleDay.dayOfWeek,
        saleDay.openingTime,
        saleDay.closingTime,
      ],
    )

    const result = query[0]

    if (!result) {
      throw new RepositoryError('Error creating product sale day')
    }

    const productSaleDayCreated = new ProductSaleDay(saleDay, result.id)

    return productSaleDayCreated
  }

  async delete(id: string): Promise<void> {
    await RangoDataSource.query(`DELETE FROM product_sale_day WHERE id = $1`, [
      id,
    ])
    console.log(id)
  }

  async listByProductSaleId(productSaleId: string): Promise<ProductSaleDay[]> {
    const rows = (await RangoDataSource.query(
      `SELECT
            id,
            product_sale_id as "productSaleId",
            day_of_week as "dayOfWeek",
            opening_time as "openingTime",
            closing_time as "closingTime",
            created_at as "createdAt"
        FROM product_sale_day
        WHERE product_sale_id = $1`,
      [productSaleId],
    )) as ProductSaleDay[]

    return rows
  }
}
