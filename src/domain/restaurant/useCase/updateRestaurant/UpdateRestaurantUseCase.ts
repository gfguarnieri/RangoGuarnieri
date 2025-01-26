import { UseCaseValidationError } from '@core/errors/UseCaseValidationError'
import { IRestaurantRepository } from '@domain/restaurant/repositories/IRestaurantRepository'
import { ICreateRestaurantDTO } from '@domain/restaurant/dtos/ICreateRestaurantDTO'
import { Restaurant } from '@domain/restaurant/entities/Restaurant'
import { DependencyInjectionTokens } from 'shared/container/DependencyInjectionTokens'
import { inject, injectable } from 'tsyringe'

@injectable()
export class UpdateRestauranteUseCase {
  constructor(
    @inject(DependencyInjectionTokens.RestaurantRepository)
    private restaurantRepository: IRestaurantRepository,
  ) {}

  async execute(id: string, input: ICreateRestaurantDTO): Promise<Restaurant> {
    if (!id) {
      throw new UseCaseValidationError('Invalid is required')
    }

    const restaurantExists = await this.restaurantRepository.findById(id)

    if (!restaurantExists) {
      throw new UseCaseValidationError('Restaurant not found')
    }

    const restaurant = await this.restaurantRepository.update(id, input)
    if (!restaurant) {
      throw new UseCaseValidationError('Restaurant not created')
    }
    return restaurant
  }
}
