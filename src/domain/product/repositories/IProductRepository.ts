import { ICreateProductDTO } from '../dtos/ICreateProductDTO'
import { IProduct } from '../models/IProduct'

export interface IProductRepository {
  create(data: ICreateProductDTO): Promise<IProduct>
  list(): Promise<IProduct[]>
  findById(id: string): Promise<IProduct | undefined>
  listByCategoryId(categoryId: string): Promise<IProduct[]>
  listByRestaurantId(restaurantId: string): Promise<IProduct[]>
  update(id: string, data: IProduct): Promise<IProduct | undefined>
  delete(id: string): Promise<void>
}
