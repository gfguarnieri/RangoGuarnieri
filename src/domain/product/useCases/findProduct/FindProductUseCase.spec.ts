import 'reflect-metadata'
import { describe, it, expect, beforeEach } from 'vitest'
import { FindProductUseCase } from './FindProductUseCase'
import { InMemoryProductRepository } from 'test/repositories/products/InMemoryProductRepository'
import { ICreateProductDTO } from 'domain/product/dtos/ICreateProductDTO'
import { IProductRepository } from 'domain/product/repositories/IProductRepository'
import { NotFoundValidationError } from 'shared/errors/NotFoundValidationError'
import { IStorageProvider } from 'domain/core/providers/IStorageProvider'
import { InMemoryStorageProvider } from 'test/providers/InMemoryStorageProvider'

let productRepository: IProductRepository
let storageProvider: IStorageProvider
let findProductUseCase: FindProductUseCase

describe('FindProductUseCase', () => {
  beforeEach(async () => {
    productRepository = new InMemoryProductRepository()
    storageProvider = new InMemoryStorageProvider()

    findProductUseCase = new FindProductUseCase(
      productRepository,
      storageProvider,
    )
  })

  it('should find a product by id', async () => {
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

    const foundProduct = await findProductUseCase.execute(product.id)
    expect(foundProduct).toHaveProperty('id', product.id)
    expect(foundProduct).toHaveProperty('name', product.name)
  })

  it('should throw an error if the product does not exist', async () => {
    await expect(
      findProductUseCase.execute('non-existent-id'),
    ).rejects.toThrowError(NotFoundValidationError)
  })
})
