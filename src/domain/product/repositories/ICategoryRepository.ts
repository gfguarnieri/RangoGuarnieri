import { ICreateCategoryDTO } from '../dtos/ICreateCategoryDTO'
import { IUpdateCategoryDTO } from '../dtos/IUpdateCategoryDTO'
import { ICategory } from '../models/ICategory'

export interface ICategoryRepository {
  create(data: ICreateCategoryDTO): Promise<ICategory>
  list(): Promise<ICategory[]>
  findById(id: string): Promise<ICategory | undefined>
  findByRestaurantId(restaurantId: string): Promise<ICategory[]>
  update(id: string, data: IUpdateCategoryDTO): Promise<ICategory | undefined>
  delete(id: string): Promise<void>
}
