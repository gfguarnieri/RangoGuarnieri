import 'reflect-metadata'
import { describe, it, expect, beforeEach } from 'vitest'
import { ListCategoryByRestaurantUseCase } from './ListCategoryByRestaurantUseCase'
import { NotFoundValidationError } from 'shared/errors/NotFoundValidationError'
import { InMemoryCategoryRepository } from 'test/repositories/products/InMemoryCategoryRepository'
import { InMemoryRestaurantRepository } from 'test/repositories/restaurant/InMemoryRestaurantRepository'
import { ICreateCategoryDTO } from 'domain/product/dtos/ICreateCategoryDTO'

let categoryRepository: InMemoryCategoryRepository
let restaurantRepository: InMemoryRestaurantRepository
let listCategoryByRestaurantUseCase: ListCategoryByRestaurantUseCase

describe('ListCategoryByRestaurantUseCase', () => {
  beforeEach(async () => {
    categoryRepository = new InMemoryCategoryRepository()
    restaurantRepository = new InMemoryRestaurantRepository()
    listCategoryByRestaurantUseCase = new ListCategoryByRestaurantUseCase(
      categoryRepository,
      restaurantRepository,
    )
  })

  it('should list categories by restaurant ID', async () => {
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

    const categoryData1: ICreateCategoryDTO = {
      restaurantId: createdRestaurant.id,
      name: 'Beverages',
    }

    const categoryData2: ICreateCategoryDTO = {
      restaurantId: createdRestaurant.id,
      name: 'Desserts',
    }

    await categoryRepository.create(categoryData1)
    await categoryRepository.create(categoryData2)

    const categories = await listCategoryByRestaurantUseCase.execute(
      createdRestaurant.id,
    )

    expect(categories).toHaveLength(2)
    expect(categories[0]).toHaveProperty('name', categoryData1.name)
    expect(categories[1]).toHaveProperty('name', categoryData2.name)
  })

  it('should throw an error if restaurant does not exist', async () => {
    await expect(
      listCategoryByRestaurantUseCase.execute('non-existent-id'),
    ).rejects.toThrowError(NotFoundValidationError)
  })
})
