import { IRestaurantRepository } from '@domain/restaurant/repositories/IRestaurantRepository'
import { ICreateCategoryDTO } from 'domain/product/dtos/ICreateCategoryDTO'
import { Category } from 'domain/product/entities/Category'
import { ICategoryRepository } from 'domain/product/repositories/ICategoryRepository'
import { DependencyInjectionTokens } from 'shared/container/DependencyInjectionTokens'
import { NotFoundValidationError } from 'shared/errors/NotFoundValidationError'
import { inject, injectable } from 'tsyringe'

@injectable()
export class CreateCategoryUseCase {
  constructor(
    @inject(DependencyInjectionTokens.CategoryRepository)
    private categoryRepository: ICategoryRepository,
    @inject(DependencyInjectionTokens.RestaurantRepository)
    private restaurantRepository: IRestaurantRepository,
  ) {}

  async execute(data: ICreateCategoryDTO): Promise<Category> {
    const restaurant = await this.restaurantRepository.findById(
      data.restaurantId,
    )

    if (!restaurant) {
      throw new NotFoundValidationError('Restaurant not found')
    }

    const category = await this.categoryRepository.create(data)

    return category
  }
}
