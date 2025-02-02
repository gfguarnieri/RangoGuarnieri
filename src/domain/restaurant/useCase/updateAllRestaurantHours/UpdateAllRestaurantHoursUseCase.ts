import { IUpdateRestaurantHoursDTO } from '@domain/restaurant/dtos/IUpdateRestaurantHoursDTO'
import { IRestaurantHoursRepository } from '@domain/restaurant/repositories/IRestaurantHoursRepository'
import { IRestaurantRepository } from '@domain/restaurant/repositories/IRestaurantRepository'
import { DependencyInjectionTokens } from 'shared/container/DependencyInjectionTokens'
import { NotFoundValidationError } from 'shared/errors/NotFoundValidationError'
import { validateAllHours } from 'shared/validations/timeValidation'
import { inject, injectable } from 'tsyringe'

@injectable()
export class UpdateAllRestaurantHoursUseCase {
  constructor(
    @inject(DependencyInjectionTokens.RestaurantRepository)
    private restaurantRepository: IRestaurantRepository,
    @inject(DependencyInjectionTokens.RestaurantHoursRepository)
    private restaurantHoursRepository: IRestaurantHoursRepository,
  ) {}

  async execute(
    restaurantId: string,
    restaurantHours: IUpdateRestaurantHoursDTO[],
  ): Promise<void> {
    validateAllHours(restaurantHours)

    const restaurantExists =
      await this.restaurantRepository.findById(restaurantId)

    if (!restaurantExists || !restaurantExists.id) {
      throw new NotFoundValidationError('Restaurant not found')
    }

    const existingHours =
      await this.restaurantHoursRepository.listByRestaurantId(
        restaurantExists.id,
      )
    const newHours = restaurantHours ?? []

    const hoursToDelete = existingHours.filter(
      (existingHour) =>
        !newHours.some(
          (newHour) =>
            newHour.dayOfWeek === existingHour.dayOfWeek &&
            newHour.openingTime === existingHour.openingTime &&
            newHour.closingTime === existingHour.closingTime,
        ),
    )

    const hoursToCreate = newHours.filter(
      (newHour) =>
        !existingHours.some(
          (existingHour) =>
            existingHour.dayOfWeek === newHour.dayOfWeek &&
            existingHour.openingTime === newHour.openingTime &&
            existingHour.closingTime === newHour.closingTime,
        ),
    )

    await Promise.all(
      hoursToDelete.map((hour) => {
        if (!hour.id) return hour
        return this.restaurantHoursRepository.delete(hour.id)
      }),
    )

    await Promise.all(
      hoursToCreate.map((hour) =>
        this.restaurantHoursRepository.create({
          ...hour,
          restaurantId: restaurantExists.id,
        }),
      ),
    )
  }
}
