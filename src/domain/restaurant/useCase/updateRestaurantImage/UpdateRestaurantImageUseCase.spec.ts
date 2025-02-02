import 'reflect-metadata'
import { describe, it, expect, beforeEach } from 'vitest'
import { UpdateRestauranteImageUseCase } from './UpdateRestaurantImageUseCase'
import { InMemoryRestaurantRepository } from 'test/repositories/InMemoryRestaurantRepository'
import { InMemoryStorageProvider } from 'test/repositories/InMemoryStorageProvider'
import { ICreateRestaurantDTO } from '@domain/restaurant/dtos/ICreateRestaurantDTO'
import { IFileUploaded } from '../../../../domain/core/models/IFileUploaded'
import { UseCaseValidationError } from 'shared/errors/UseCaseValidationError'

let restaurantRepository: InMemoryRestaurantRepository
let storageProvider: InMemoryStorageProvider
let updateRestaurantImageUseCase: UpdateRestauranteImageUseCase

describe('UpdateRestaurantImageUseCase', () => {
  beforeEach(async () => {
    restaurantRepository = new InMemoryRestaurantRepository()
    storageProvider = new InMemoryStorageProvider()
    updateRestaurantImageUseCase = new UpdateRestauranteImageUseCase(
      restaurantRepository,
      storageProvider,
    )
  })

  it('should update the restaurant image', async () => {
    const restaurantData: ICreateRestaurantDTO = {
      name: 'Restaurante Guarnieri',
      image: '',
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

    const file: IFileUploaded = {
      filename: 'new-image.jpg',
      filebuffer: Buffer.from(''),
      filemime: 'image/jpeg',
    }

    const response = await updateRestaurantImageUseCase.execute(
      createdRestaurant.id,
      file,
    )

    expect(response).toHaveProperty('id')
    expect(response).toHaveProperty('image', file.filename)
  })

  it('should throw an error if restaurant does not exist', async () => {
    const file: IFileUploaded = {
      filename: 'new-image.jpg',
      filebuffer: Buffer.from(''),
      filemime: 'image/jpeg',
    }

    await expect(
      updateRestaurantImageUseCase.execute('non-existent-id', file),
    ).rejects.toThrowError(UseCaseValidationError)
  })

  it('should throw an error if no file is provided', async () => {
    const restaurantData: ICreateRestaurantDTO = {
      name: 'Restaurante Guarnieri',
      image: '',
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

    await expect(
      updateRestaurantImageUseCase.execute(
        createdRestaurant.id,
        {} as IFileUploaded,
      ),
    ).rejects.toThrowError(UseCaseValidationError)
  })
})
