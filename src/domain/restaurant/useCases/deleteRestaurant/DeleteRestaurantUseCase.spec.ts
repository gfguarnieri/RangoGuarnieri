import 'reflect-metadata'
import { InMemoryRestaurantRepository } from 'test/repositories/restaurant/InMemoryRestaurantRepository'
import { beforeAll, describe, expect, test } from 'vitest'
import { DeleteRestaurantUseCase } from './DeleteRestaurantUseCase'
import { IRestaurantRepository } from '@domain/restaurant/repositories/IRestaurantRepository'
import { NotFoundValidationError } from 'shared/errors/NotFoundValidationError'
import { IStorageProvider } from 'domain/core/providers/IStorageProvider'
import { InMemoryStorageProvider } from 'test/providers/InMemoryStorageProvider'

let restaurantRepository: IRestaurantRepository
let deleteRestaurantUseCase: DeleteRestaurantUseCase
let storageProvider: IStorageProvider

describe('DeleteRestaurantUseCase', async () => {
  beforeAll(async () => {
    restaurantRepository = new InMemoryRestaurantRepository()
    storageProvider = new InMemoryStorageProvider()
    deleteRestaurantUseCase = new DeleteRestaurantUseCase(
      restaurantRepository,
      storageProvider,
    )
  })

  test('should delete a restaurant', async () => {
    const restaurantData = {
      name: 'Restaurante Guarnieri',
      image: 'guarnieri-logo',
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

    await deleteRestaurantUseCase.execute(createdRestaurant.id)

    const findDeletedRestaurant = await restaurantRepository.findById(
      createdRestaurant.id,
    )

    expect(findDeletedRestaurant).toBeUndefined()
  })

  test('should throw an error if restaurant does not exist', async () => {
    await expect(deleteRestaurantUseCase.execute('123')).rejects.toThrowError(
      NotFoundValidationError,
    )
  })
})
