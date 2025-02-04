import 'reflect-metadata'
import { UpdateCategoryUseCase } from './UpdateCategoryUseCase'
import { InMemoryCategoryRepository } from 'test/repositories/products/InMemoryCategoryRepository'
import { InMemoryRestaurantRepository } from 'test/repositories/restaurant/InMemoryRestaurantRepository'
import { describe, it, expect, beforeAll } from 'vitest'
import { IUpdateCategoryDTO } from 'domain/product/dtos/IUpdateCategoryDTO'
import { NotFoundValidationError } from 'shared/errors/NotFoundValidationError'
import { ICategoryRepository } from 'domain/product/repositories/ICategoryRepository'
import { IRestaurantRepository } from '@domain/restaurant/repositories/IRestaurantRepository'

let categoryRepository: ICategoryRepository
let restaurantRepository: IRestaurantRepository

let updateCategoryUseCase: UpdateCategoryUseCase

describe('UpdateCategoryUseCase', async () => {
  beforeAll(async () => {
    categoryRepository = new InMemoryCategoryRepository()
    restaurantRepository = new InMemoryRestaurantRepository()
    updateCategoryUseCase = new UpdateCategoryUseCase(
      categoryRepository,
      restaurantRepository,
    )
  })

  it('should update a category', async () => {
    const restaurantData = {
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

    const categoryData = {
      name: 'Categoria 1',
      restaurantId: createdRestaurant.id,
    }

    const createdCategory = await categoryRepository.create(categoryData)

    if (!createdCategory || !createdCategory.id) {
      throw new Error('Error creating category')
    }

    const updateData: IUpdateCategoryDTO = {
      name: 'Categoria Atualizada',
      restaurantId: createdRestaurant.id,
    }

    const updatedCategory = await updateCategoryUseCase.execute(
      createdCategory.id,
      updateData,
    )

    expect(updatedCategory).toHaveProperty('id')
    expect(updatedCategory?.name).toBe(updateData.name)
  })

  it('should throw an error if category does not exist', async () => {
    const updateData: IUpdateCategoryDTO = {
      name: 'Categoria não existente',
      restaurantId: '123',
    }

    await expect(
      updateCategoryUseCase.execute('123', updateData),
    ).rejects.toThrowError(NotFoundValidationError)
  })

  it('should throw an error if restaurant does not exist', async () => {
    const restaurant = await restaurantRepository.create({
      name: 'Restaurante Guarnieri',
      image: 'guarnieri-logo',
      address: 'Rua José',
      number: '123',
      city: 'Sorocaba',
      state: 'SP',
      neighborhood: 'Jardim Paulista',
      postalCode: '18065-511',
      restaurantHours: [],
    })

    if (!restaurant || !restaurant.id) {
      throw new Error('Error creating restaurant')
    }

    const categoryData = {
      name: 'Categoria 1',
      restaurantId: restaurant.id,
    }

    const createdCategory = await categoryRepository.create(categoryData)

    if (!createdCategory || !createdCategory.id) {
      throw new Error('Error creating category')
    }

    const updateData: IUpdateCategoryDTO = {
      name: 'Categoria Atualizada',
      restaurantId: '000',
    }

    await expect(
      updateCategoryUseCase.execute(createdCategory.id, updateData),
    ).rejects.toThrowError(NotFoundValidationError)
  })
})
