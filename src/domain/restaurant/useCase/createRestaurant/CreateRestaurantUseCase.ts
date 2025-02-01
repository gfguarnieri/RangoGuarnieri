import { ICreateRestaurantDTO } from '@domain/restaurant/dtos/ICreateRestaurantDTO'
import { Restaurant } from '@domain/restaurant/entities/Restaurant'
import { IRestaurantRepository } from '@domain/restaurant/repositories/IRestaurantRepository'
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
    const restaurant = await this.restaurantRepository.create(input)
    return restaurant
  }
}
