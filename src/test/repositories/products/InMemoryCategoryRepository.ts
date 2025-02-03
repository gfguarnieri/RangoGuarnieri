import { ICreateCategoryDTO } from 'domain/product/dtos/ICreateCategoryDTO'
import { IUpdateCategoryDTO } from 'domain/product/dtos/IUpdateCategoryDTO'
import { Category } from 'domain/product/entities/Category'
import { ICategory } from 'domain/product/models/ICategory'
import { ICategoryRepository } from 'domain/product/repositories/ICategoryRepository'

export class InMemoryCategoryRepository implements ICategoryRepository {
  private categories: ICategory[] = []

  async create(data: ICreateCategoryDTO): Promise<ICategory> {
    const category: ICategory = new Category(data)
    this.categories.push(category)
    return category
  }

  async list(): Promise<ICategory[]> {
    return this.categories
  }

  async findById(id: string): Promise<ICategory | undefined> {
    return this.categories.find((category) => category.id === id)
  }

  async findByRestaurantId(restaurantId: string): Promise<ICategory[]> {
    return this.categories.filter(
      (category) => category.restaurantId === restaurantId,
    )
  }

  async update(
    id: string,
    data: IUpdateCategoryDTO,
  ): Promise<ICategory | undefined> {
    const categoryIndex = this.categories.findIndex(
      (category) => category.id === id,
    )
    if (categoryIndex === -1) {
      return undefined
    }
    const updatedCategory = { ...this.categories[categoryIndex], ...data }
    this.categories[categoryIndex] = updatedCategory
    return updatedCategory
  }

  async delete(id: string): Promise<void> {
    this.categories = this.categories.filter((category) => category.id !== id)
  }
}
