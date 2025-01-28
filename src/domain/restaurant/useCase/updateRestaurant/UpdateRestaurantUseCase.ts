import { UseCaseValidationError } from 'shared/errors/UseCaseValidationError'
import { Restaurant } from '@domain/restaurant/entities/Restaurant'
import { IRestaurantRepository } from '@domain/restaurant/repositories/IRestaurantRepository'
import { RestaurantValidator } from '@domain/restaurant/validators/RestaurantValidator'
import { DependencyInjectionTokens } from 'shared/container/DependencyInjectionTokens'
import { inject, injectable } from 'tsyringe'
import { IUpdateRestaurantDTO } from '@domain/restaurant/dtos/IUpdateRestaurantDTO'
import { NotFoundValidationError } from 'shared/errors/NotFoundValidationError'

@injectable()
export class UpdateRestauranteUseCase {
  constructor(
    @inject(DependencyInjectionTokens.RestaurantRepository)
    private restaurantRepository: IRestaurantRepository,
  ) {}

  async execute(
    id: string,
    input: IUpdateRestaurantDTO,
  ): Promise<Restaurant | undefined> {
    RestaurantValidator.Validate(input)

    if (!id) {
      throw new UseCaseValidationError('Id is required')
    }

    const restaurantExists = await this.restaurantRepository.findById(id)

    if (!restaurantExists) {
      throw new NotFoundValidationError('Restaurant not found')
    }

    const restaurant = await this.restaurantRepository.update(id, input)

    return restaurant
  }
}
