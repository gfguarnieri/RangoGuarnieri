import { ICreateCategoryDTO } from 'domain/product/dtos/ICreateCategoryDTO'
import { IUpdateCategoryDTO } from 'domain/product/dtos/IUpdateCategoryDTO'
import { Category } from 'domain/product/entities/Category'
import { ICategoryRepository } from 'domain/product/repositories/ICategoryRepository'

export class InMemoryCategoryRepository implements ICategoryRepository {
  private categories: Category[] = []

  async exists(id: string): Promise<boolean> {
    return this.categories.some((category) => category.id === id)
  }

  async create(data: ICreateCategoryDTO): Promise<Category> {
    const category: Category = new Category(data)
    this.categories.push(category)
    return category
  }

  async list(): Promise<Category[]> {
    return this.categories
  }

  async findById(id: string): Promise<Category | undefined> {
    return this.categories.find((category) => category.id === id)
  }

  async listByRestaurantId(restaurantId: string): Promise<Category[]> {
    return this.categories.filter(
      (category) => category.restaurantId === restaurantId,
    )
  }

  async update(
    id: string,
    data: IUpdateCategoryDTO,
  ): Promise<Category | undefined> {
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
