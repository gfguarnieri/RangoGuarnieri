import 'reflect-metadata'
import { describe, it, expect, beforeEach } from 'vitest'
import { ListRestaurantHoursUseCase } from './ListRestaurantHoursUseCase'
import { IRestaurantHoursRepository } from '@domain/restaurant/repositories/IRestaurantHoursRepository'
import { InMemoryRestaurantHoursRepository } from 'test/repositories/InMemoryRestaurantHoursRepository'
import { DayOfWeek } from '@domain/restaurant/models/IRestaurantHours'

let restaurantHoursRepository: IRestaurantHoursRepository
let listRestaurantHoursUseCase: ListRestaurantHoursUseCase

describe('ListRestaurantHoursUseCase', () => {
  beforeEach(async () => {
    restaurantHoursRepository = new InMemoryRestaurantHoursRepository()
    listRestaurantHoursUseCase = new ListRestaurantHoursUseCase(
      restaurantHoursRepository,
    )
  })

  it('should return restaurant hours for a valid restaurant ID', async () => {
    const restaurantHoursData = {
      restaurantId: 'valid-restaurant-id',
      dayOfWeek: DayOfWeek.FRIDAY,
      openingTime: '09:00',
      closingTime: '17:00',
    }

    await restaurantHoursRepository.create(restaurantHoursData)

    const restaurantHours = await listRestaurantHoursUseCase.execute(
      'valid-restaurant-id',
    )

    expect(restaurantHours).toHaveLength(1)
    expect(restaurantHours[0]).toMatchObject(restaurantHoursData)
  })

  it('should return an empty array for an invalid restaurant ID', async () => {
    const restaurantHours = await listRestaurantHoursUseCase.execute(
      'invalid-restaurant-id',
    )
    expect(restaurantHours).toHaveLength(0)
  })

  it('should throw an error if no restaurant ID is provided', async () => {
    await expect(listRestaurantHoursUseCase.execute('')).rejects.toThrowError(
      'Restaurant ID is required',
    )
  })
})
