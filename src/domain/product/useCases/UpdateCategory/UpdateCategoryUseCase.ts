import { IRestaurantRepository } from '@domain/restaurant/repositories/IRestaurantRepository'
import { IUpdateCategoryDTO } from 'domain/product/dtos/IUpdateCategoryDTO'
import { Category } from 'domain/product/entities/Category'
import { ICategoryRepository } from 'domain/product/repositories/ICategoryRepository'
import { DependencyInjectionTokens } from 'shared/container/DependencyInjectionTokens'
import { NotFoundValidationError } from 'shared/errors/NotFoundValidationError'
import { inject, injectable } from 'tsyringe'

@injectable()
export class UpdateCategoryUseCase {
  constructor(
    @inject(DependencyInjectionTokens.CategoryRepository)
    private categoryRepository: ICategoryRepository,
    @inject(DependencyInjectionTokens.RestaurantRepository)
    private restaurantRepository: IRestaurantRepository,
  ) {}

  async execute(id: string, input: IUpdateCategoryDTO): Promise<Category> {
    const restaurant = await this.restaurantRepository.findById(
      input.restaurantId,
    )

    if (!restaurant) {
      throw new NotFoundValidationError('Restaurant not found')
    }

    const category = await this.categoryRepository.update(id, input)

    if (!category) {
      throw new NotFoundValidationError('Category not found')
    }

    return category
  }
}
