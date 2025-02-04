import { IRestaurantRepository } from '@domain/restaurant/repositories/IRestaurantRepository'
import { Category } from 'domain/product/entities/Category'
import { ICategoryRepository } from 'domain/product/repositories/ICategoryRepository'
import { DependencyInjectionTokens } from 'shared/container/DependencyInjectionTokens'
import { NotFoundValidationError } from 'shared/errors/NotFoundValidationError'
import { inject, injectable } from 'tsyringe'

@injectable()
export class ListCategoryByRestaurantUseCase {
  constructor(
    @inject(DependencyInjectionTokens.CategoryRepository)
    private categoryRepository: ICategoryRepository,
    @inject(DependencyInjectionTokens.RestaurantRepository)
    private restaurantRepository: IRestaurantRepository,
  ) {}

  async execute(restaurantId: string): Promise<Category[]> {
    const restaurant = await this.restaurantRepository.findById(restaurantId)

    if (!restaurant) {
      throw new NotFoundValidationError('Restaurant not found')
    }

    const categories =
      await this.categoryRepository.listByRestaurantId(restaurantId)

    return categories
  }
}
