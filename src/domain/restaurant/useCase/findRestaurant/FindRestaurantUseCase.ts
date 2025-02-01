import { UseCaseValidationError } from 'shared/errors/UseCaseValidationError'
import { Restaurant } from '@domain/restaurant/entities/Restaurant'
import { IRestaurantRepository } from '@domain/restaurant/repositories/IRestaurantRepository'
import { DependencyInjectionTokens } from 'shared/container/DependencyInjectionTokens'
import { inject, injectable } from 'tsyringe'
import { IRestaurantHoursRepository } from '@domain/restaurant/repositories/IRestaurantHoursRepository'

@injectable()
export class FindRestaurantUseCase {
  constructor(
    @inject(DependencyInjectionTokens.RestaurantRepository)
    private restaurantRepository: IRestaurantRepository,
    @inject(DependencyInjectionTokens.RestaurantHoursRepository)
    private restaurantHoursRepository: IRestaurantHoursRepository,
  ) {}

  async execute(id: string): Promise<Restaurant> {
    const restaurant = await this.restaurantRepository.findById(id)

    if (!restaurant) {
      throw new UseCaseValidationError('Restaurant not found')
    }

    const hours = await this.restaurantHoursRepository.listByRestaurantId(id)
    restaurant.restaurantHours = hours

    return restaurant
  }
}
