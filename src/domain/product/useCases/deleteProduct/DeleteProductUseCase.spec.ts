import 'reflect-metadata'
import { describe, it, expect, beforeEach } from 'vitest'
import { DeleteProductUseCase } from './DeleteProductUseCase'
import { InMemoryProductRepository } from 'test/repositories/products/InMemoryProductRepository'
import { ICreateProductDTO } from 'domain/product/dtos/ICreateProductDTO'
import { IProductRepository } from 'domain/product/repositories/IProductRepository'
import { IStorageProvider } from 'domain/core/providers/IStorageProvider'
import { InMemoryStorageProvider } from 'test/providers/InMemoryStorageProvider'
import { NotFoundValidationError } from 'shared/errors/NotFoundValidationError'

let productRepository: IProductRepository
let storageProvider: IStorageProvider
let deleteProductUseCase: DeleteProductUseCase

describe('DeleteProductUseCase', () => {
  beforeEach(async () => {
    productRepository = new InMemoryProductRepository()
    storageProvider = new InMemoryStorageProvider()
    deleteProductUseCase = new DeleteProductUseCase(
      productRepository,
      storageProvider,
    )
  })

  it('should delete a product by id', async () => {
    const productData: ICreateProductDTO = {
      restaurantId: '123',
      categoryId: '456',
      name: 'Product 1',
      description: 'Description 1',
      price: 10,
      image: 'image1.jpg',
    }

    const product = await productRepository.create(productData)

    if (!product || !product.id) {
      throw new Error('Error creating product')
    }

    await deleteProductUseCase.execute(product.id)

    const foundProduct = await productRepository.findById(product.id)
    expect(foundProduct).toBeUndefined()
  })

  it('should throw an error if the product does not exist', async () => {
    await expect(deleteProductUseCase.execute('123')).rejects.toThrowError(
      NotFoundValidationError,
    )
  })
})
