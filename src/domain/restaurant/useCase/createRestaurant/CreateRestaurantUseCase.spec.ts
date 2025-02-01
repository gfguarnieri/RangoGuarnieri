import 'reflect-metadata'
import { CreateRestauranteUseCase } from './CreateRestaurantUseCase'
import { InMemoryRestaurantRepository } from 'test/repositories/InMemoryRestaurantRepository'
import { describe, it, expect, beforeAll } from 'vitest'
import { ICreateRestaurantDTO } from '@domain/restaurant/dtos/ICreateRestaurantDTO'

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
      address: 'Rua José',
      number: '123',
      city: 'Sorocaba',
      state: 'SP',
      postalCode: '18065-511',
      neighborhood: 'Jardim Paulista',
    }

    const restaurant = await createRestaurantUseCase.execute(restaurantData)

    expect(restaurant).toHaveProperty('id')
    expect(restaurant).contains(restaurantData)
  })
})
