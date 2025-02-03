import { IRestaurantRepository } from '@domain/restaurant/repositories/IRestaurantRepository'
import { DependencyInjectionTokens } from 'shared/container/DependencyInjectionTokens'
import { NotFoundValidationError } from 'shared/errors/NotFoundValidationError'
import { inject, injectable } from 'tsyringe'

@injectable()
export class DeleteRestaurantUseCase {
  constructor(
    @inject(DependencyInjectionTokens.RestaurantRepository)
    private restaurantRepository: IRestaurantRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const restaurant = await this.restaurantRepository.findById(id)

    if (!restaurant) {
      throw new NotFoundValidationError('Restaurant not found')
    }

    await this.restaurantRepository.delete(id)
  }
}
