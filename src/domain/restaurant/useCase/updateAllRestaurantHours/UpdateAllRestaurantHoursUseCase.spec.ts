import 'reflect-metadata'
import { describe, it, expect, beforeAll } from 'vitest'
import { UpdateAllRestaurantHoursUseCase } from './UpdateAllRestaurantHoursUseCase'
import { InMemoryRestaurantHoursRepository } from 'test/repositories/InMemoryRestaurantHoursRepository'
import { InMemoryRestaurantRepository } from 'test/repositories/InMemoryRestaurantRepository'
import { ICreateRestaurantDTO } from '@domain/restaurant/dtos/ICreateRestaurantDTO'
import {
  DayOfWeek,
  IRestaurantHours,
} from '@domain/restaurant/models/IRestaurantHours'
import { NotFoundValidationError } from 'shared/errors/NotFoundValidationError'

let restaurantRepository: InMemoryRestaurantRepository
let restaurantHoursRepository: InMemoryRestaurantHoursRepository
let updateAllRestaurantHoursUseCase: UpdateAllRestaurantHoursUseCase

describe('UpdateAllRestaurantHoursUseCase', () => {
  beforeAll(async () => {
    restaurantRepository = new InMemoryRestaurantRepository()
    restaurantHoursRepository = new InMemoryRestaurantHoursRepository()
    updateAllRestaurantHoursUseCase = new UpdateAllRestaurantHoursUseCase(
      restaurantRepository,
      restaurantHoursRepository,
    )
  })

  it('should update all restaurant hours', async () => {
    const restaurantData: ICreateRestaurantDTO = {
      name: 'Restaurante Guarnieri',
      image: '',
      address: 'Rua José',
      number: '123',
      city: 'Sorocaba',
      state: 'SP',
      neighborhood: 'Jardim Paulista',
      postalCode: '18065-511',
      restaurantHours: [],
    }

    const createdRestaurant = await restaurantRepository.create(restaurantData)

    if (!createdRestaurant || !createdRestaurant.id) {
      throw new Error('Error creating restaurant')
    }

    const newHours: IRestaurantHours[] = [
      {
        restaurantId: createdRestaurant.id,
        dayOfWeek: DayOfWeek.MONDAY,
        openingTime: '09:00',
        closingTime: '17:00',
      },
      {
        restaurantId: createdRestaurant.id,
        dayOfWeek: DayOfWeek.TUESDAY,
        openingTime: '09:00',
        closingTime: '17:00',
      },
    ]

    await updateAllRestaurantHoursUseCase.execute(
      createdRestaurant.id,
      newHours,
    )

    const updatedHours = await restaurantHoursRepository.listByRestaurantId(
      createdRestaurant.id,
    )

    expect(updatedHours).toHaveLength(2)
  })

  it('should throw an error if restaurant does not exist', async () => {
    const newHours: IRestaurantHours[] = [
      {
        restaurantId: '123',
        dayOfWeek: DayOfWeek.TUESDAY,
        openingTime: '09:00',
        closingTime: '17:00',
      },
    ]

    await expect(
      updateAllRestaurantHoursUseCase.execute('non-existent-id', newHours),
    ).rejects.toThrowError(NotFoundValidationError)
  })
})
