import 'reflect-metadata'
import { describe, it, expect, beforeEach } from 'vitest'
import { UpdateProductImageUseCase } from './UpdateProductImageUseCase'
import { InMemoryProductRepository } from 'test/repositories/products/InMemoryProductRepository'
import { ICreateProductDTO } from 'domain/product/dtos/ICreateProductDTO'
import { IProductRepository } from 'domain/product/repositories/IProductRepository'
import { IStorageProvider } from 'domain/core/providers/IStorageProvider'
import { InMemoryStorageProvider } from 'test/providers/InMemoryStorageProvider'
import { IFileUploaded } from 'domain/core/models/IFileUploaded'
import { NotFoundValidationError } from 'shared/errors/NotFoundValidationError'

let productRepository: IProductRepository
let storageProvider: IStorageProvider
let updateProductImageUseCase: UpdateProductImageUseCase

describe('UpdateProductImageUseCase', () => {
  beforeEach(async () => {
    productRepository = new InMemoryProductRepository()
    storageProvider = new InMemoryStorageProvider()
    updateProductImageUseCase = new UpdateProductImageUseCase(
      productRepository,
      storageProvider,
    )
  })

  it('should update the product image', async () => {
    const productData: ICreateProductDTO = {
      restaurantId: '123',
      categoryId: '456',
      name: 'Product 1',
      description: 'Description 1',
      price: 10,
      image: 'image1.jpg',
    }

    const product = await productRepository.create(productData)

    const newImage: IFileUploaded = {
      filename: 'newImage.jpg',
      filemime: 'image/jpeg',
      filebuffer: Buffer.from(''),
    }

    const updatedProduct = await updateProductImageUseCase.execute(
      product.id!,
      newImage,
    )

    expect(updatedProduct).toHaveProperty('image', newImage.filename)
  })

  it('should throw an error if the product does not exist', async () => {
    const newImage: IFileUploaded = {
      filebuffer: Buffer.from(''),
      filename: 'newImage.jpg',
      filemime: 'image/jpeg',
    }

    await expect(
      updateProductImageUseCase.execute('123', newImage),
    ).rejects.toThrowError(NotFoundValidationError)
  })
})
