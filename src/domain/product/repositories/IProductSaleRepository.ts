import { ICreateProductSaleDTO } from '../dtos/ICreateProductSaleDTO'
import { IUpdateProductSaleDTO } from '../dtos/IUpdateProductSaleDTO'
import { ProductSale } from '../entities/ProductSale'

export interface IProductSaleRepository {
  exists(productId: string, productSaleId: string): Promise<boolean>
  create(sale: ICreateProductSaleDTO): Promise<ProductSale>
  update(
    id: string,
    sale: IUpdateProductSaleDTO,
  ): Promise<ProductSale | undefined>
  listByProductId(productId: string): Promise<ProductSale[]>
  findById(id: string): Promise<ProductSale | undefined>
  getActiveSale(productId: string): Promise<ProductSale | undefined>
  delete(productId: string, productSaleId: string): Promise<void>
  active(productId: string, productSaleId: string): Promise<void>
  inactive(productId: string, productSaleId: string): Promise<void>
  inactiveAll(productId: string): Promise<void>
}
