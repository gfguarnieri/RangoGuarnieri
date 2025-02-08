import { ICreateCategoryDTO } from '../dtos/ICreateCategoryDTO'
import { IUpdateCategoryDTO } from '../dtos/IUpdateCategoryDTO'
import { Category } from '../entities/Category'

export interface ICategoryRepository {
  create(data: ICreateCategoryDTO): Promise<Category>
  list(): Promise<Category[]>
  findById(id: string): Promise<Category | undefined>
  listByRestaurantId(restaurantId: string): Promise<Category[]>
  update(id: string, data: IUpdateCategoryDTO): Promise<Category | undefined>
  delete(id: string): Promise<void>
}
