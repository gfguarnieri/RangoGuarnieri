import 'reflect-metadata'
import { describe, it, expect, beforeEach } from 'vitest'
import { FindCategoryUseCase } from './FindCategoryUseCase'
import { InMemoryCategoryRepository } from 'test/repositories/products/InMemoryCategoryRepository'
import { NotFoundValidationError } from 'shared/errors/NotFoundValidationError'
import { ICreateCategoryDTO } from 'domain/product/dtos/ICreateCategoryDTO'
import { ICategoryRepository } from 'domain/product/repositories/ICategoryRepository'

let categoryRepository: ICategoryRepository

let findCategoryUseCase: FindCategoryUseCase

describe('FindCategoryUseCase', () => {
  beforeEach(async () => {
    categoryRepository = new InMemoryCategoryRepository()
    findCategoryUseCase = new FindCategoryUseCase(categoryRepository)
  })

  it('should find a category by id', async () => {
    const categoryData: ICreateCategoryDTO = {
      name: 'Bebidas',
      restaurantId: '123',
    }

    const createdCategory = await categoryRepository.create(categoryData)

    if (!createdCategory || !createdCategory.id) {
      throw new Error('Error creating category')
    }

    const foundCategory = await findCategoryUseCase.execute(createdCategory.id)

    expect(foundCategory).toHaveProperty('id')
    expect(foundCategory).toHaveProperty('name', categoryData.name)
  })

  it('should throw an error if category does not exist', async () => {
    await expect(findCategoryUseCase.execute('321')).rejects.toThrowError(
      NotFoundValidationError,
    )
  })
})
