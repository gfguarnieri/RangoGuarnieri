import { UseCaseValidationError } from '@core/errors/UseCaseValidationError'
import { IFindRestaurantResponse } from '@domain/restaurant/dtos/IFindRestaurantResponse'
import { IRestaurantRepository } from '@domain/restaurant/repositories/IRestaurantRepository'
import { DependencyInjectionTokens } from 'shared/container/DependencyInjectionTokens'
import { inject, injectable } from 'tsyringe'

@injectable()
export class FindRestaurantUseCase {
  constructor(
    @inject(DependencyInjectionTokens.RestaurantRepository)
    private restaurantRepository: IRestaurantRepository,
  ) {}

  async execute(id: string): Promise<IFindRestaurantResponse> {
    const restaurant = await this.restaurantRepository.findById(id)
    if (!restaurant) {
      throw new UseCaseValidationError('Restaurant not found')
    }
    return restaurant.object
  }
}
