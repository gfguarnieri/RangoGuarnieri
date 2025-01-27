import 'reflect-metadata'
import { EntityValidationError } from '@core/errors/EntityValidationError'
import { UseCaseValidationError } from '@core/errors/UseCaseValidationError'
import { UpdateRestauranteUseCase } from './UpdateRestaurantUseCase'
import { InMemoryRestaurantRepository } from 'test/repositories/InMemoryRestaurantRepository'
import { describe, it, expect, beforeAll } from 'vitest'
import { ICreateRestaurantRequest } from '@domain/restaurant/dtos/ICreateRestaurantRequest'
import { IUpdateRestaurantRequest } from '@domain/restaurant/dtos/IUpdateRestaurantRequest'

let restaurantRepository: InMemoryRestaurantRepository
let updateRestaurantUseCase: UpdateRestauranteUseCase

describe('UpdateRestaurantUseCase', async () => {
  beforeAll(async () => {
    restaurantRepository = new InMemoryRestaurantRepository()
    updateRestaurantUseCase = new UpdateRestauranteUseCase(restaurantRepository)
  })

  it('should update a restaurant', async () => {
    const restaurantData: ICreateRestaurantRequest = {
      name: 'Restaurante Guarnieri',
      image: 'guarnieri-logo',
    }

    const createdRestaurant = await restaurantRepository.create(restaurantData)

    const updateData: IUpdateRestaurantRequest = {
      name: 'Restaurante Giovanni',
      image: 'giovanni-logo',
    }

    const updatedRestaurant = await updateRestaurantUseCase.execute(
      createdRestaurant.id.toString(),
      updateData,
    )

    expect(updatedRestaurant).toHaveProperty('id')
    expect(updatedRestaurant.name).toBe(updateData.name)
    expect(updatedRestaurant.image).toBe(updateData.image)
  })

  it('should throw an error if restaurant does not exist', async () => {
    const updateData: IUpdateRestaurantRequest = {
      name: 'Restaurante não existente',
      image: 'image-url-example',
      address: 'Rua José',
      number: '123',
      city: 'Sorocaba',
      state: 'SP',
      country: 'Brazil',
      postalCode: '18065-511',
    }

    await expect(
      updateRestaurantUseCase.execute('000', updateData),
    ).rejects.toThrowError(UseCaseValidationError)
  })

  it('should throw an error if update data is invalid', async () => {
    const restaurantData: ICreateRestaurantRequest = {
      name: 'Restaurante original',
      image: 'original-image-url',
      address: 'Rua José',
      number: '123',
      city: 'Sorocaba',
      state: 'SP',
      country: 'Brazil',
      postalCode: '18065-511',
    }

    const createdRestaurant = await restaurantRepository.create(restaurantData)

    const invalidUpdateData: IUpdateRestaurantRequest = {
      name: '',
      image: '',
      address: 'Rua José',
      number: '123',
      city: 'Sorocaba',
      state: 'SP',
      country: 'Brazil',
      postalCode: '18065-511',
    }

    await expect(
      updateRestaurantUseCase.execute(
        createdRestaurant.id.toString(),
        invalidUpdateData,
      ),
    ).rejects.toThrowError(EntityValidationError)
  })
})
