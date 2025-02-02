import { IRestaurantHours } from '@domain/restaurant/models/IRestaurantHours'
import { IRestaurantHoursRepository } from '@domain/restaurant/repositories/IRestaurantHoursRepository'
import { DependencyInjectionTokens } from 'shared/container/DependencyInjectionTokens'
import { UseCaseValidationError } from 'shared/errors/UseCaseValidationError'
import { inject, injectable } from 'tsyringe'

@injectable()
export class ListRestaurantHoursUseCase {
  constructor(
    @inject(DependencyInjectionTokens.RestaurantHoursRepository)
    private restaurantHoursRepository: IRestaurantHoursRepository,
  ) {}

  async execute(restaurantId: string): Promise<IRestaurantHours[]> {
    if (!restaurantId) {
      throw new UseCaseValidationError('Restaurant ID is required')
    }
    return this.restaurantHoursRepository.listByRestaurantId(restaurantId)
  }
}
