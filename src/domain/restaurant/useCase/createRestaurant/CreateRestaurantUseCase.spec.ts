import 'reflect-metadata'
import { EntityValidationError } from '@core/errors/EntityValidationError'
import { ICreateRestaurantRequest } from '@domain/restaurant/dtos/ICreateRestaurantRequest'
import { CreateRestauranteUseCase } from './CreateRestaurantUseCase'
import { InMemoryRestaurantRepository } from 'test/repositories/InMemoryRestaurantRepository'
import { describe, it, expect, beforeAll } from 'vitest'

let restaurantRepository: InMemoryRestaurantRepository
let createRestaurantUseCase: CreateRestauranteUseCase

describe('CreateRestaurantUseCase', async () => {
  beforeAll(async () => {
    restaurantRepository = new InMemoryRestaurantRepository()
    createRestaurantUseCase = new CreateRestauranteUseCase(restaurantRepository)
  })

  it('should create a restaurant', async () => {
    const restaurantData: ICreateRestaurantRequest = {
      name: 'Restaurante Guarnieri',
      image: 'test-image-url',
      address: 'Rua José',
      number: '123',
      city: 'Sorocaba',
      state: 'SP',
      country: 'Brazil',
      postalCode: '18065-511',
    }

    const restaurant = await createRestaurantUseCase.execute(restaurantData)

    expect(restaurant).toHaveProperty('id')
    expect(restaurant).contains(restaurantData)
  })

  it('should throw an error if restaurant data is invalid', async () => {
    const invalidRestaurantData: ICreateRestaurantRequest = {
      name: '',
      image: '',
    }
    await expect(
      createRestaurantUseCase.execute(invalidRestaurantData),
    ).rejects.toThrowError(EntityValidationError)
  })
})
