import { IListRestaurantResponse } from '@domain/restaurant/dtos/IListRestaurantResponse'
import { IRestaurantRepository } from '@domain/restaurant/repositories/IRestaurantRepository'
import { DependencyInjectionTokens } from 'shared/container/DependencyInjectionTokens'
import { inject, injectable } from 'tsyringe'

@injectable()
export class ListRestaurantUseCase {
  constructor(
    @inject(DependencyInjectionTokens.RestaurantRepository)
    private restaurantRepository: IRestaurantRepository,
  ) {}

  async execute(): Promise<IListRestaurantResponse> {
    const restaurants = (await this.restaurantRepository.list()).map(
      (i) => i.object,
    )
    return {
      restaurants,
    }
  }
}
