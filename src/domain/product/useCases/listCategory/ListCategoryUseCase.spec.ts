import 'reflect-metadata'
import { describe, it, expect, beforeEach } from 'vitest'
import { ListCategoryUseCase } from './ListCategoryUseCase'
import { InMemoryCategoryRepository } from 'test/repositories/products/InMemoryCategoryRepository'
import { ICreateCategoryDTO } from 'domain/product/dtos/ICreateCategoryDTO'

let categoryRepository: InMemoryCategoryRepository
let listCategoryUseCase: ListCategoryUseCase

describe('ListCategoryUseCase', () => {
  beforeEach(async () => {
    categoryRepository = new InMemoryCategoryRepository()
    listCategoryUseCase = new ListCategoryUseCase(categoryRepository)
  })

  it('should list all categories', async () => {
    const categoryData1: ICreateCategoryDTO = {
      name: 'Bebidas',
      restaurantId: '123',
    }

    const categoryData2: ICreateCategoryDTO = {
      name: 'Doces',
      restaurantId: '123',
    }

    await categoryRepository.create(categoryData1)
    await categoryRepository.create(categoryData2)

    const categories = await listCategoryUseCase.execute()

    expect(categories).toHaveLength(2)
    expect(categories[0]).toHaveProperty('name', categoryData1.name)
    expect(categories[1]).toHaveProperty('name', categoryData2.name)
  })

  it('should return an empty list if no categories are found', async () => {
    const categories = await listCategoryUseCase.execute()
    expect(categories).toHaveLength(0)
  })
})
