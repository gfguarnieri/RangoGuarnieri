import { ICreateProductSaleDayDTO } from '../dtos/ICreateProductSaleDayDTO'
import { ProductSaleDay } from '../entities/ProductSaleDay'

export interface IProductSaleDayRepository {
  create(saleDay: ICreateProductSaleDayDTO): Promise<ProductSaleDay>
  delete(productSaleId: string): Promise<void>
  listByProductSaleId(productSaleId: string): Promise<ProductSaleDay[]>
}
