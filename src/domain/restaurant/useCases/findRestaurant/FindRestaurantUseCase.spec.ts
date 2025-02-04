import 'reflect-metadata'
import { FindRestaurantUseCase } from './FindRestaurantUseCase'
import { InMemoryRestaurantRepository } from 'test/repositories/restaurant/InMemoryRestaurantRepository'
import { UseCaseValidationError } from 'shared/errors/UseCaseValidationError'
import { describe, it, expect, beforeAll } from 'vitest'
import { ICreateRestaurantDTO } from '@domain/restaurant/dtos/ICreateRestaurantDTO'
import { IRestaurantHoursRepository } from '@domain/restaurant/repositories/IRestaurantHoursRepository'
import { IRestaurantRepository } from '@domain/restaurant/repositories/IRestaurantRepository'
import { InMemoryRestaurantHoursRepository } from 'test/repositories/restaurant/InMemoryRestaurantHoursRepository'
import { IStorageProvider } from 'domain/core/providers/IStorageProvider'
import { InMemoryStorageProvider } from 'test/providers/InMemoryStorageProvider'

let restaurantRepository: IRestaurantRepository
let restaurantHoursRepository: IRestaurantHoursRepository
let storageProvider: IStorageProvider

let findRestaurantUseCase: FindRestaurantUseCase

describe('FindRestaurantUseCase', async () => {
  beforeAll(async () => {
    restaurantRepository = new InMemoryRestaurantRepository()
    restaurantHoursRepository = new InMemoryRestaurantHoursRepository()
    storageProvider = new InMemoryStorageProvider()
    findRestaurantUseCase = new FindRestaurantUseCase(
      restaurantRepository,
      restaurantHoursRepository,
      storageProvider,
    )
  })

  it('should find a restaurant by id', async () => {
    const restaurantData: ICreateRestaurantDTO = {
      name: 'Restaurante Guarnieri',
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

    const foundRestaurant = await findRestaurantUseCase.execute(
      createdRestaurant.id,
    )

    expect(foundRestaurant).toHaveProperty('id')
    expect(foundRestaurant).contain({
      name: restaurantData.name,
      address: restaurantData.address,
      number: restaurantData.number,
      city: restaurantData.city,
      state: restaurantData.state,
      neighborhood: restaurantData.neighborhood,
      postalCode: restaurantData.postalCode,
    })
    expect(foundRestaurant.restaurantHours).toHaveLength(0)
  })

  it('should throw an error if restaurant does not exist', async () => {
    await expect(
      findRestaurantUseCase.execute('non-existent-id'),
    ).rejects.toThrowError(UseCaseValidationError)
  })
})
