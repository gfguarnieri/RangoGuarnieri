import 'reflect-metadata'
import { FindRestaurantUseCase } from './FindRestaurantUseCase'
import { InMemoryRestaurantRepository } from 'test/repositories/InMemoryRestaurantRepository'
import { UseCaseValidationError } from 'shared/errors/UseCaseValidationError'
import { describe, it, expect, beforeAll } from 'vitest'
import { ICreateRestaurantDTO } from '@domain/restaurant/dtos/ICreateRestaurantDTO'

let restaurantRepository: InMemoryRestaurantRepository
let findRestaurantUseCase: FindRestaurantUseCase

describe('FindRestaurantUseCase', async () => {
  beforeAll(async () => {
    restaurantRepository = new InMemoryRestaurantRepository()
    findRestaurantUseCase = new FindRestaurantUseCase(restaurantRepository)
  })

  it('should find a restaurant by id', async () => {
    const restaurantData: ICreateRestaurantDTO = {
      name: 'Restaurante Guarnieri',
      image: 'guarnieri-logo',
      address: 'Rua José',
      number: '123',
      city: 'Sorocaba',
      state: 'SP',
      country: 'Brazil',
      postalCode: '18065-511',
    }

    const createdRestaurant = await restaurantRepository.create(restaurantData)

    if (!createdRestaurant || !createdRestaurant.id) {
      throw new Error('Error creating restaurant')
    }

    const foundRestaurant = await findRestaurantUseCase.execute(
      createdRestaurant.id,
    )

    expect(foundRestaurant).toHaveProperty('id')
    expect(foundRestaurant).contain(restaurantData)
  })

  it('should throw an error if restaurant does not exist', async () => {
    await expect(
      findRestaurantUseCase.execute('non-existent-id'),
    ).rejects.toThrowError(UseCaseValidationError)
  })
})
