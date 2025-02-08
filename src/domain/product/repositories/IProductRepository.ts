import { ICreateProductDTO } from '../dtos/ICreateProductDTO'
import { Product } from '../entities/Product'

export interface IProductRepository {
  exists(id: string): Promise<boolean>
  create(data: ICreateProductDTO): Promise<Product>
  list(): Promise<Product[]>
  findById(id: string): Promise<Product | undefined>
  listByCategoryId(categoryId: string): Promise<Product[]>
  listByRestaurantId(restaurantId: string): Promise<Product[]>
  update(id: string, data: Product): Promise<Product | undefined>
  delete(id: string): Promise<void>
}
