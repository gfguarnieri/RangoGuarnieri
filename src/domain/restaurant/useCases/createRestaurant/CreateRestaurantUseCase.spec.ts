import 'reflect-metadata'
import { CreateRestauranteUseCase } from './CreateRestaurantUseCase'
import { InMemoryRestaurantRepository } from 'test/repositories/restaurant/InMemoryRestaurantRepository'
import { describe, it, expect, beforeAll } from 'vitest'
import { ICreateRestaurantDTO } from '@domain/restaurant/dtos/ICreateRestaurantDTO'
import { InMemoryRestaurantHoursRepository } from 'test/repositories/restaurant/InMemoryRestaurantHoursRepository'
import { IRestaurantRepository } from '@domain/restaurant/repositories/IRestaurantRepository'
import { IRestaurantHoursRepository } from '@domain/restaurant/repositories/IRestaurantHoursRepository'
import { DayOfWeek } from 'domain/core/models/IHours'

let restaurantRepository: IRestaurantRepository
let restaurantHoursRepository: IRestaurantHoursRepository

let createRestaurantUseCase: CreateRestauranteUseCase

describe('CreateRestaurantUseCase', async () => {
  beforeAll(async () => {
    restaurantRepository = new InMemoryRestaurantRepository()
    restaurantHoursRepository = new InMemoryRestaurantHoursRepository()

    createRestaurantUseCase = new CreateRestauranteUseCase(
      restaurantRepository,
      restaurantHoursRepository,
    )
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
      restaurantHours: [
        {
          openingTime: '10:00',
          closingTime: '22:00',
          dayOfWeek: DayOfWeek.FRIDAY,
        },
      ],
    }

    const restaurant = await createRestaurantUseCase.execute(restaurantData)

    expect(restaurant).toHaveProperty('id')
    expect(restaurant).contains({
      name: restaurantData.name,
      image: restaurantData.image,
      address: restaurantData.address,
      number: restaurantData.number,
      city: restaurantData.city,
      state: restaurantData.state,
      postalCode: restaurantData.postalCode,
      neighborhood: restaurantData.neighborhood,
    })
    expect(restaurant.restaurantHours).toHaveLength(1)
  })
})
