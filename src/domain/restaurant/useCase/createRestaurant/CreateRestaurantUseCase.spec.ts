import 'reflect-metadata'
import { EntityValidationError } from '@core/errors/EntityValidationError'
import { ICreateRestaurantDTO } from '@domain/restaurant/dtos/ICreateRestaurantDTO'
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
    const restaurantData: ICreateRestaurantDTO = {
      name: 'Restaurante Guarnieri',
      image: 'test-image-url',
    }

    const restaurant = await createRestaurantUseCase.execute(restaurantData)

    expect(restaurant).toHaveProperty('id')
    expect(restaurant.name).toBe(restaurantData.name)
    expect(restaurant.image).toBe(restaurantData.image)
  })

  it('should throw an error if restaurant data is invalid', async () => {
    const invalidRestaurantData: ICreateRestaurantDTO = {
      name: '',
      image: '',
    }
    await expect(
      createRestaurantUseCase.execute(invalidRestaurantData),
    ).rejects.toThrowError(EntityValidationError)
  })
})
