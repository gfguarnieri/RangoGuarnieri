import 'reflect-metadata'
import { UpdateRestauranteUseCase } from './UpdateRestaurantUseCase'
import { InMemoryRestaurantRepository } from 'test/repositories/restaurant/InMemoryRestaurantRepository'
import { describe, it, expect, beforeAll } from 'vitest'
import { ICreateRestaurantDTO } from '@domain/restaurant/dtos/ICreateRestaurantDTO'
import { NotFoundValidationError } from 'shared/errors/NotFoundValidationError'
import { InMemoryRestaurantHoursRepository } from 'test/repositories/restaurant/InMemoryRestaurantHoursRepository'
import { IRestaurantRepository } from '@domain/restaurant/repositories/IRestaurantRepository'
import { IRestaurantHoursRepository } from '@domain/restaurant/repositories/IRestaurantHoursRepository'

let restaurantRepository: IRestaurantRepository
let restaurantHoursRepository: IRestaurantHoursRepository

let updateRestaurantUseCase: UpdateRestauranteUseCase

describe('UpdateRestaurantUseCase', async () => {
  beforeAll(async () => {
    restaurantRepository = new InMemoryRestaurantRepository()
    restaurantHoursRepository = new InMemoryRestaurantHoursRepository()
    updateRestaurantUseCase = new UpdateRestauranteUseCase(
      restaurantRepository,
      restaurantHoursRepository,
    )
  })

  it('should update a restaurant', async () => {
    const restaurantData: ICreateRestaurantDTO = {
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

    const updateData: ICreateRestaurantDTO = {
      name: 'Restaurante Giovanni',
      address: 'Rua José',
      number: '123',
      city: 'Sorocaba',
      state: 'SP',
      neighborhood: 'Jardim Paulista',
      postalCode: '18065-511',
      restaurantHours: [],
    }

    const updatedRestaurant = await updateRestaurantUseCase.execute(
      createdRestaurant.id,
      updateData,
    )

    expect(updatedRestaurant).toHaveProperty('id')
    expect(updatedRestaurant?.name).toBe(updateData.name)
  })

  it('should throw an error if restaurant does not exist', async () => {
    const updateData: ICreateRestaurantDTO = {
      name: 'Restaurante não existente',
      image: 'image-url-example',
      address: 'Rua José',
      number: '123',
      city: 'Sorocaba',
      state: 'SP',
      neighborhood: 'Jardim Paulista',
      postalCode: '18065-511',
      restaurantHours: [],
    }

    await expect(
      updateRestaurantUseCase.execute('000', updateData),
    ).rejects.toThrowError(NotFoundValidationError)
  })
})
