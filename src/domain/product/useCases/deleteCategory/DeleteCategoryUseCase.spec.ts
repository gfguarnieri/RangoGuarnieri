import 'reflect-metadata'
import { describe, it, expect, beforeEach } from 'vitest'
import { DeleteCategoryUseCase } from './DeleteCategoryUseCase'
import { NotFoundValidationError } from 'shared/errors/NotFoundValidationError'
import { InMemoryCategoryRepository } from 'test/repositories/products/InMemoryCategoryRepository'
import { ICreateCategoryDTO } from 'domain/product/dtos/ICreateCategoryDTO'
import { ICategoryRepository } from 'domain/product/repositories/ICategoryRepository'

let categoryRepository: ICategoryRepository

let deleteCategoryUseCase: DeleteCategoryUseCase

describe('DeleteCategoryUseCase', () => {
  beforeEach(async () => {
    categoryRepository = new InMemoryCategoryRepository()
    deleteCategoryUseCase = new DeleteCategoryUseCase(categoryRepository)
  })

  it('should delete an existing category', async () => {
    const categoryData: ICreateCategoryDTO = {
      name: 'Bebidas',
      restaurantId: '123',
    }

    const createdCategory = await categoryRepository.create(categoryData)

    if (!createdCategory || !createdCategory.id) {
      throw new Error('Error creating category')
    }

    await deleteCategoryUseCase.execute(createdCategory.id)

    const foundCategory = await categoryRepository.findById(createdCategory.id)

    expect(foundCategory).toBeUndefined()
  })

  it('should throw an error if category does not exist', async () => {
    await expect(
      deleteCategoryUseCase.execute('non-existent-id'),
    ).rejects.toThrowError(NotFoundValidationError)
  })
})
