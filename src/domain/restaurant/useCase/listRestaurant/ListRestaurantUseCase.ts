import { Restaurant } from '@domain/restaurant/entities/Restaurant'
import { RestaurantBucket } from '@domain/restaurant/models/IRestaurant'
import { IRestaurantRepository } from '@domain/restaurant/repositories/IRestaurantRepository'
import { IStorageProvider } from 'domain/core/providers/IStorageProvider'
import { DependencyInjectionTokens } from 'shared/container/DependencyInjectionTokens'
import { inject, injectable } from 'tsyringe'

@injectable()
export class ListRestaurantUseCase {
  constructor(
    @inject(DependencyInjectionTokens.RestaurantRepository)
    private restaurantRepository: IRestaurantRepository,
    @inject(DependencyInjectionTokens.StorageProvider)
    private storageProvider: IStorageProvider,
  ) {}

  async execute(): Promise<Restaurant[]> {
    const restaurants = await this.restaurantRepository.list()

    for (const restaurant of restaurants) {
      if (restaurant.image) {
        restaurant.image = this.storageProvider.getUrl(
          restaurant.image,
          RestaurantBucket,
        )
      }
    }

    return restaurants
  }
}
