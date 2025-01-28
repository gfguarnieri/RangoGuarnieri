import 'reflect-metadata'
import { UseCaseValidationError } from 'shared/errors/UseCaseValidationError'
import { UpdateRestauranteUseCase } from './UpdateRestaurantUseCase'
import { InMemoryRestaurantRepository } from 'test/repositories/InMemoryRestaurantRepository'
import { describe, it, expect, beforeAll } from 'vitest'
import { ICreateRestaurantDTO } from '@domain/restaurant/dtos/ICreateRestaurantDTO'
import { IRestaurant } from '@domain/restaurant/models/IRestaurant'
import { InputValidationError } from 'shared/errors/InputValidationError'
import { NotFoundValidationError } from 'shared/errors/NotFoundValidationError'

let restaurantRepository: InMemoryRestaurantRepository
let updateRestaurantUseCase: UpdateRestauranteUseCase

describe('UpdateRestaurantUseCase', async () => {
  beforeAll(async () => {
    restaurantRepository = new InMemoryRestaurantRepository()
    updateRestaurantUseCase = new UpdateRestauranteUseCase(restaurantRepository)
  })

  it('should throw an error if id is not provided', async () => {
    const updateData: ICreateRestaurantDTO = {
      name: 'Restaurante Giovanni',
      image: 'giovanni-logo',
    }

    await expect(
      updateRestaurantUseCase.execute('', updateData),
    ).rejects.toThrowError(UseCaseValidationError)
  })

  it('should update a restaurant', async () => {
    const restaurantData: ICreateRestaurantDTO = {
      name: 'Restaurante Guarnieri',
      image: 'guarnieri-logo',
    }

    const createdRestaurant = await restaurantRepository.create(restaurantData)

    if (!createdRestaurant || !createdRestaurant.id) {
      throw new Error('Error creating restaurant')
    }

    const updateData: ICreateRestaurantDTO = {
      name: 'Restaurante Giovanni',
      image: 'giovanni-logo',
    }

    const updatedRestaurant = await updateRestaurantUseCase.execute(
      createdRestaurant.id,
      updateData,
    )

    expect(updatedRestaurant).toHaveProperty('id')
    expect(updatedRestaurant?.name).toBe(updateData.name)
    expect(updatedRestaurant?.image).toBe(updateData.image)
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
    }

    await expect(
      updateRestaurantUseCase.execute('000', updateData),
    ).rejects.toThrowError(NotFoundValidationError)
  })

  it('should throw an error if update data is invalid', async () => {
    const restaurantData: IRestaurant = {
      name: 'Restaurante original',
      image: 'original-image-url',
      address: 'Rua José',
      number: '123',
      city: 'Sorocaba',
      state: 'SP',
      neighborhood: 'Jardim Paulista',
      postalCode: '18065-511',
    }

    const createdRestaurant = await restaurantRepository.create(restaurantData)

    const invalidUpdateData: ICreateRestaurantDTO = {
      name: 'Restaurante simples',
      image: '',
      address: 'Rua José',
      number: '123',
      city: 'Sorocaba',
      state: 'SP',
      neighborhood: 'Jardim Paulista',
      postalCode: '18065-511',
    }

    if (!createdRestaurant || !createdRestaurant.id) {
      throw new Error('Error creating restaurant')
    }

    await expect(
      updateRestaurantUseCase.execute(createdRestaurant.id, invalidUpdateData),
    ).rejects.toThrowError(InputValidationError)
  })
})
