import { UseCaseValidationError } from '@core/errors/UseCaseValidationError'
import { IRestaurantRepository } from '@domain/restaurant/repositories/IRestaurantRepository'
import { DependencyInjectionTokens } from 'shared/container/DependencyInjectionTokens'
import { inject, injectable } from 'tsyringe'
import { IUpdateRestaurantRequest } from '@domain/restaurant/dtos/IUpdateRestaurantRequest'
import { IUpdateRestaurantResponse } from '@domain/restaurant/dtos/IUpdateRestaurantResponse'

@injectable()
export class UpdateRestauranteUseCase {
  constructor(
    @inject(DependencyInjectionTokens.RestaurantRepository)
    private restaurantRepository: IRestaurantRepository,
  ) {}

  async execute(
    id: string,
    input: IUpdateRestaurantRequest,
  ): Promise<IUpdateRestaurantResponse> {
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
    return restaurant.object
  }
}
