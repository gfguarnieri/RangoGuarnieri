import { RestaurantBucket } from '@domain/restaurant/models/IRestaurant'
import { IRestaurantRepository } from '@domain/restaurant/repositories/IRestaurantRepository'
import { IStorageProvider } from 'domain/core/providers/IStorageProvider'
import { DependencyInjectionTokens } from 'shared/container/DependencyInjectionTokens'
import { NotFoundValidationError } from 'shared/errors/NotFoundValidationError'
import { inject, injectable } from 'tsyringe'

@injectable()
export class DeleteRestaurantUseCase {
  constructor(
    @inject(DependencyInjectionTokens.RestaurantRepository)
    private restaurantRepository: IRestaurantRepository,
    @inject(DependencyInjectionTokens.StorageProvider)
    private storageProvider: IStorageProvider,
  ) {}

  async execute(id: string): Promise<void> {
    const restaurant = await this.restaurantRepository.findById(id)

    if (!restaurant) {
      throw new NotFoundValidationError('Restaurant not found')
    }

    if (restaurant.image) {
      await this.storageProvider.delete(restaurant.image, RestaurantBucket)
    }

    await this.restaurantRepository.delete(id)
  }
}
