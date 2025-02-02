import { UseCaseValidationError } from 'shared/errors/UseCaseValidationError'
import { Restaurant } from '@domain/restaurant/entities/Restaurant'
import { IRestaurantRepository } from '@domain/restaurant/repositories/IRestaurantRepository'
import { DependencyInjectionTokens } from 'shared/container/DependencyInjectionTokens'
import { inject, injectable } from 'tsyringe'
import { IRestaurantHoursRepository } from '@domain/restaurant/repositories/IRestaurantHoursRepository'
import { RestaurantBucket } from '@domain/restaurant/models/IRestaurant'
import { IStorageProvider } from 'domain/core/providers/IStorageProvider'

@injectable()
export class FindRestaurantUseCase {
  constructor(
    @inject(DependencyInjectionTokens.RestaurantRepository)
    private restaurantRepository: IRestaurantRepository,
    @inject(DependencyInjectionTokens.RestaurantHoursRepository)
    private restaurantHoursRepository: IRestaurantHoursRepository,
    @inject(DependencyInjectionTokens.StorageProvider)
    private storageProvider: IStorageProvider,
  ) {}

  async execute(id: string): Promise<Restaurant> {
    const restaurant = await this.restaurantRepository.findById(id)

    if (!restaurant) {
      throw new UseCaseValidationError('Restaurant not found')
    }

    const hours = await this.restaurantHoursRepository.listByRestaurantId(id)
    restaurant.restaurantHours = hours

    if (restaurant.image) {
      restaurant.image = this.storageProvider.getUrl(
        restaurant.image,
        RestaurantBucket,
      )
    }

    return restaurant
  }
}
