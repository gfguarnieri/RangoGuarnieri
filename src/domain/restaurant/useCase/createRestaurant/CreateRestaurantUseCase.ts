import { UseCaseValidationError } from '@core/errors/UseCaseValidationError'
import { ICreateRestaurantDTO } from '@domain/restaurant/dtos/ICreateRestaurantDTO'
import { Restaurant } from '@domain/restaurant/entities/Restaurant'
import { IRestaurantRepository } from '@domain/restaurant/repositories/IRestaurantRepository'
import { RestaurantValidator } from '@domain/restaurant/validators/RestaurantValidator'
import { DependencyInjectionTokens } from 'shared/container/DependencyInjectionTokens'
import { inject, injectable } from 'tsyringe'

interface IRequest extends ICreateRestaurantDTO {}

@injectable()
export class CreateRestauranteUseCase {
  constructor(
    @inject(DependencyInjectionTokens.RestaurantRepository)
    private restaurantRepository: IRestaurantRepository,
  ) {}

  async execute(input: IRequest): Promise<Restaurant> {
    RestaurantValidator.Validate(input)
    const restaurant = await this.restaurantRepository.create(input)
    if (!restaurant) {
      throw new UseCaseValidationError('Restaurant not created')
    }
    return restaurant
  }
}
