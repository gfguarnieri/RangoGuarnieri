import 'reflect-metadata'
import { EntityValidationError } from '@core/errors/EntityValidationError'
import { UseCaseValidationError } from '@core/errors/UseCaseValidationError'
import { ICreateRestaurantDTO } from '@domain/restaurant/dtos/ICreateRestaurantDTO'
import { IUpdateRestaurantDTO } from '@domain/restaurant/dtos/IUpdateRestaurantDTO'
import { UpdateRestauranteUseCase } from './UpdateRestaurantUseCase'
import { InMemoryRestaurantRepository } from 'test/repositories/InMemoryRestaurantRepository'
import { describe, it, expect, beforeAll } from 'vitest'

let restaurantRepository: InMemoryRestaurantRepository
let updateRestaurantUseCase: UpdateRestauranteUseCase

describe('UpdateRestaurantUseCase', async () => {
  beforeAll(async () => {
    restaurantRepository = new InMemoryRestaurantRepository()
    updateRestaurantUseCase = new UpdateRestauranteUseCase(restaurantRepository)
  })

  it('should update a restaurant', async () => {
    const restaurantData: ICreateRestaurantDTO = {
      name: 'Restaurante Guarnieri',
      image: 'guarnieri-logo',
    }

    const createdRestaurant = await restaurantRepository.create(restaurantData)

    const updateData: IUpdateRestaurantDTO = {
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
    const updateData: IUpdateRestaurantDTO = {
      name: 'Restaurante não existente',
      image: 'image-url-example',
    }

    await expect(
      updateRestaurantUseCase.execute('000', updateData),
    ).rejects.toThrowError(UseCaseValidationError)
  })

  it('should throw an error if update data is invalid', async () => {
    const restaurantData: ICreateRestaurantDTO = {
      name: 'Restaurante original',
      image: 'original-image-url',
    }

    const createdRestaurant = await restaurantRepository.create(restaurantData)

    const invalidUpdateData: IUpdateRestaurantDTO = {
      name: '',
      image: '',
    }

    await expect(
      updateRestaurantUseCase.execute(
        createdRestaurant.id.toString(),
        invalidUpdateData,
      ),
    ).rejects.toThrowError(EntityValidationError)
  })
})
