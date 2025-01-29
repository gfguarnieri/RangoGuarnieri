import 'reflect-metadata'
import { describe, it, expect, beforeEach } from 'vitest'
import { ListRestaurantUseCase } from './ListRestaurantUseCase'
import { InMemoryRestaurantRepository } from 'test/repositories/InMemoryRestaurantRepository'
import { ICreateRestaurantDTO } from '@domain/restaurant/dtos/ICreateRestaurantDTO'

let restaurantRepository: InMemoryRestaurantRepository
let listRestaurantUseCase: ListRestaurantUseCase

describe('ListRestaurantUseCase', async () => {
  beforeEach(async () => {
    restaurantRepository = new InMemoryRestaurantRepository()
    listRestaurantUseCase = new ListRestaurantUseCase(restaurantRepository)
  })

  it('should list all restaurants', async () => {
    const restaurant1: ICreateRestaurantDTO = {
      name: 'Restaurante Guarnieri',
      image: 'guarnieri-logo',
      address: 'Rua José',
      number: '123',
      city: 'Sorocaba',
      state: 'SP',
      neighborhood: 'Jardim Paulista',
      postalCode: '18065-511',
    }

    const restaurant2: ICreateRestaurantDTO = {
      name: 'Restaurante Giovanni',
      image: 'giovanni-logo',
      address: 'Rua José',
      number: '123',
      city: 'Sorocaba',
      state: 'SP',
      neighborhood: 'Jardim Paulista',
      postalCode: '18065-511',
    }

    await restaurantRepository.create(restaurant1)
    await restaurantRepository.create(restaurant2)

    const restaurants = await listRestaurantUseCase.execute()

    expect(restaurants).toHaveLength(2)
    expect(restaurants[0].name).toBe(restaurant1.name)
    expect(restaurants[1].name).toBe(restaurant2.name)
  })

  it('should return an empty list if no restaurants are found', async () => {
    const restaurants = await listRestaurantUseCase.execute()

    expect(restaurants).toHaveLength(0)
  })
})
