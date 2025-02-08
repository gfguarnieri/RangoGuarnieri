import { Restaurant } from '@domain/restaurant/entities/Restaurant'
import { IRestaurantRepository } from '@domain/restaurant/repositories/IRestaurantRepository'
import { DependencyInjectionTokens } from 'shared/container/DependencyInjectionTokens'
import { inject, injectable } from 'tsyringe'
import { IUpdateRestaurantDTO } from '@domain/restaurant/dtos/IUpdateRestaurantDTO'
import { NotFoundValidationError } from 'shared/errors/NotFoundValidationError'
import { validateAllHours } from 'shared/validations/timeValidation'
import { IRestaurantHoursRepository } from '@domain/restaurant/repositories/IRestaurantHoursRepository'

@injectable()
export class UpdateRestauranteUseCase {
  constructor(
    @inject(DependencyInjectionTokens.RestaurantRepository)
    private restaurantRepository: IRestaurantRepository,
    @inject(DependencyInjectionTokens.RestaurantHoursRepository)
    private restaurantHoursRepository: IRestaurantHoursRepository,
  ) {}

  async execute(
    id: string,
    input: Omit<IUpdateRestaurantDTO, 'image'>,
  ): Promise<Restaurant | undefined> {
    if (input.restaurantHours) {
      validateAllHours(input.restaurantHours)
    }

    const restaurantExists = await this.restaurantRepository.exists(id)

    if (!restaurantExists) {
      throw new NotFoundValidationError('Restaurant not found')
    }

    await this.restaurantRepository.update(id, input)

    if (input.restaurantHours) {
      const existingHours =
        await this.restaurantHoursRepository.listByRestaurantId(id)
      const newHours = input.restaurantHours ?? []

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
            restaurantId: restaurant!.id,
          }),
        ),
      )
    }
    const restaurant = await this.restaurantRepository.findById(id)

    return restaurant
  }
}
