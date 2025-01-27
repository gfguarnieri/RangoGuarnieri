import { UseCaseValidationError } from '@core/errors/UseCaseValidationError'
import { IRestaurantRepository } from '@domain/restaurant/repositories/IRestaurantRepository'
import { ICreateRestaurantRequest } from '@domain/restaurant/dtos/ICreateRestaurantRequest'
import { DependencyInjectionTokens } from 'shared/container/DependencyInjectionTokens'
import { inject, injectable } from 'tsyringe'
import { ICreateRestaurantResponse } from '@domain/restaurant/dtos/ICreateRestaurantResponse'

@injectable()
export class CreateRestauranteUseCase {
  constructor(
    @inject(DependencyInjectionTokens.RestaurantRepository)
    private restaurantRepository: IRestaurantRepository,
  ) {}

  async execute(
    input: ICreateRestaurantRequest,
  ): Promise<ICreateRestaurantResponse> {
    const restaurant = await this.restaurantRepository.create(input)
    if (!restaurant) {
      throw new UseCaseValidationError('Restaurant not created')
    }
    return restaurant
  }
}
