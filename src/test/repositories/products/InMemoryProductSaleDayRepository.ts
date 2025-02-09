import { ICreateProductSaleDayDTO } from 'domain/product/dtos/ICreateProductSaleDayDTO'
import { ProductSaleDay } from 'domain/product/entities/ProductSaleDay'
import { IProductSaleDayRepository } from 'domain/product/repositories/IProductSaleDayRepository'

export class InMemoryProductSaleDayRepository
  implements IProductSaleDayRepository
{
  private productSaleDays: ProductSaleDay[] = []

  async create(data: ICreateProductSaleDayDTO): Promise<ProductSaleDay> {
    const productSaleDay = new ProductSaleDay(data)
    this.productSaleDays.push(productSaleDay)
    return productSaleDay
  }

  async listByProductSaleId(productSaleId: string): Promise<ProductSaleDay[]> {
    return this.productSaleDays.filter(
      (saleDay) => saleDay.productSaleId === productSaleId,
    )
  }

  async delete(id: string): Promise<void> {
    this.productSaleDays = this.productSaleDays.filter(
      (saleDay) => saleDay.id !== id,
    )
  }
}
