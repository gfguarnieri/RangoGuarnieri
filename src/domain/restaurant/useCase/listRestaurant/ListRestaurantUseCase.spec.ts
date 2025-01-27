import 'reflect-metadata'
import { describe, it, expect, beforeEach } from 'vitest'
import { ListRestaurantUseCase } from './ListRestaurantUseCase'
import { InMemoryRestaurantRepository } from 'test/repositories/InMemoryRestaurantRepository'
import { ICreateRestaurantRequest } from '@domain/restaurant/dtos/ICreateRestaurantRequest'

let restaurantRepository: InMemoryRestaurantRepository
let listRestaurantUseCase: ListRestaurantUseCase

describe('ListRestaurantUseCase', async () => {
  beforeEach(async () => {
    restaurantRepository = new InMemoryRestaurantRepository()
    listRestaurantUseCase = new ListRestaurantUseCase(restaurantRepository)
  })

  it('should list all restaurants', async () => {
    const restaurant1: ICreateRestaurantRequest = {
      name: 'Restaurante Guarnieri',
      image: 'guarnieri-logo',
      address: 'Rua José',
      number: '123',
      city: 'Sorocaba',
      state: 'SP',
      country: 'Brazil',
      postalCode: '18065-511',
    }

    const restaurant2: ICreateRestaurantRequest = {
      name: 'Restaurante Giovanni',
      image: 'giovanni-logo',
      address: 'Rua Maria',
      number: '321',
      city: 'São Paulo',
      state: 'SP',
      country: 'Brazil',
      postalCode: '18465-511',
    }

    await restaurantRepository.create(restaurant1)
    await restaurantRepository.create(restaurant2)

    const response = await listRestaurantUseCase.execute()

    expect(response.restaurants).toHaveLength(2)
    expect(response.restaurants[0]).contains(restaurant1)
    expect(response.restaurants[1]).contains(restaurant2)
  })

  it('should return an empty list if no restaurants are found', async () => {
    const response = await listRestaurantUseCase.execute()

    expect(response.restaurants).toHaveLength(0)
  })
})
