import { ICreateRestaurantDTO } from '@domain/restaurant/dtos/ICreateRestaurantDTO'
import { Restaurant } from '@domain/restaurant/entities/Restaurant'
import { IRestaurantHoursRepository } from '@domain/restaurant/repositories/IRestaurantHoursRepository'
import { IRestaurantRepository } from '@domain/restaurant/repositories/IRestaurantRepository'
import { DependencyInjectionTokens } from 'shared/container/DependencyInjectionTokens'
import { validateAllHours } from 'shared/validations/timeValidation'
import { inject, injectable } from 'tsyringe'

@injectable()
export class CreateRestauranteUseCase {
  constructor(
    @inject(DependencyInjectionTokens.RestaurantRepository)
    private restaurantRepository: IRestaurantRepository,
    @inject(DependencyInjectionTokens.RestaurantHoursRepository)
    private restaurantHoursRepository: IRestaurantHoursRepository,
  ) {}

  async execute(input: ICreateRestaurantDTO): Promise<Restaurant> {
    const hours = input.restaurantHours ?? []

    validateAllHours(hours)

    const restaurant = await this.restaurantRepository.create(input)

    if (hours) {
      const createdHours = await Promise.all(
        hours.map(async (hour) => {
          hour.restaurantId = restaurant.id
          return await this.restaurantHoursRepository.create(hour)
        }),
      )
      restaurant.restaurantHours = createdHours
    }

    return restaurant
  }
}
