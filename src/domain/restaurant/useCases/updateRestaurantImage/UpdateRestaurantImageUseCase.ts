import { IUpdateRestaurantImageDTO } from '@domain/restaurant/dtos/IUpdateRestaurantImageDTO'
import { RestaurantBucket } from '@domain/restaurant/models/IRestaurant'
import { IRestaurantRepository } from '@domain/restaurant/repositories/IRestaurantRepository'
import { IStorageProvider } from 'domain/core/providers/IStorageProvider'
import { DependencyInjectionTokens } from 'shared/container/DependencyInjectionTokens'
import { UseCaseValidationError } from 'shared/errors/UseCaseValidationError'
import { inject, injectable } from 'tsyringe'

interface IResponseImageRestaurant {
  id: string
  image: string
}

@injectable()
export class UpdateRestauranteImageUseCase {
  constructor(
    @inject(DependencyInjectionTokens.RestaurantRepository)
    private restaurantRepository: IRestaurantRepository,

    @inject(DependencyInjectionTokens.StorageProvider)
    private storageProvider: IStorageProvider,
  ) {}

  async execute({
    restaurantId,
    file,
  }: IUpdateRestaurantImageDTO): Promise<IResponseImageRestaurant | undefined> {
    if (!file || !file.filebuffer || !file.filemime) {
      throw new UseCaseValidationError('Image is required')
    }

    const restaurant = await this.restaurantRepository.findById(restaurantId)

    if (!restaurant || !restaurant.id) {
      throw new UseCaseValidationError('Restaurant not found')
    }

    if (restaurant.image) {
      await this.storageProvider.delete(restaurant.image, RestaurantBucket)
    }

    const imageOutput = await this.storageProvider.upload(
      file,
      RestaurantBucket,
    )

    const updatedRestaurant = await this.restaurantRepository.updateImage(
      restaurantId,
      imageOutput,
    )

    const response: IResponseImageRestaurant = {
      id: updatedRestaurant.id!,
      image: await this.storageProvider.getUrl(
        updatedRestaurant.image!,
        RestaurantBucket,
      ),
    }

    return response
  }
}
