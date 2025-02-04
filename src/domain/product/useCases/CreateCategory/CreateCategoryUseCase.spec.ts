import 'reflect-metadata'
import { describe, it, expect, beforeAll } from 'vitest'
import { CreateCategoryUseCase } from './CreateCategoryUseCase'
import { ICreateCategoryDTO } from '../../dtos/ICreateCategoryDTO'
import { InMemoryRestaurantRepository } from 'test/repositories/restaurant/InMemoryRestaurantRepository'
import { NotFoundValidationError } from 'shared/errors/NotFoundValidationError'
import { InMemoryCategoryRepository } from 'test/repositories/products/InMemoryCategoryRepository'
import { ICategoryRepository } from 'domain/product/repositories/ICategoryRepository'
import { IRestaurantRepository } from '@domain/restaurant/repositories/IRestaurantRepository'

let categoryRepository: ICategoryRepository
let restaurantRepository: IRestaurantRepository

let createCategoryUseCase: CreateCategoryUseCase

describe('CreateCategoryUseCase', () => {
  beforeAll(async () => {
    categoryRepository = new InMemoryCategoryRepository()
    restaurantRepository = new InMemoryRestaurantRepository()
    createCategoryUseCase = new CreateCategoryUseCase(
      categoryRepository,
      restaurantRepository,
    )
  })

  it('should throw an error if restaurant does not exist', async () => {
    const categoryData: ICreateCategoryDTO = {
      name: 'Placa de Vídeo',
      restaurantId: '123',
    }

    await expect(
      createCategoryUseCase.execute(categoryData),
    ).rejects.toThrowError(NotFoundValidationError)
  })

  it('should create a new category', async () => {
    const restaurantData = {
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

    const categoryData: ICreateCategoryDTO = {
      restaurantId: createdRestaurant.id,
      name: 'Placa de Vídeo',
    }

    const createdCategory = await createCategoryUseCase.execute(categoryData)

    expect(createdCategory).toHaveProperty('id')
    expect(createdCategory).toHaveProperty('name', categoryData.name)
  })
})
