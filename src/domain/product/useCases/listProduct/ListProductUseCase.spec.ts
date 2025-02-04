import 'reflect-metadata'
import { describe, it, expect, beforeEach } from 'vitest'
import { ListProductUseCase } from './ListProductUseCase'
import { InMemoryProductRepository } from 'test/repositories/products/InMemoryProductRepository'
import { ICreateProductDTO } from 'domain/product/dtos/ICreateProductDTO'
import { InMemoryStorageProvider } from 'test/providers/InMemoryStorageProvider'
import { IStorageProvider } from 'domain/core/providers/IStorageProvider'
import { IProductRepository } from 'domain/product/repositories/IProductRepository'

let productRepository: IProductRepository
let storageProvider: IStorageProvider

let listProductUseCase: ListProductUseCase

describe('ListProductUseCase', () => {
  beforeEach(async () => {
    productRepository = new InMemoryProductRepository()
    storageProvider = new InMemoryStorageProvider()
    listProductUseCase = new ListProductUseCase(
      productRepository,
      storageProvider,
    )
  })

  it('should list all products', async () => {
    const productData1: ICreateProductDTO = {
      restaurantId: '123',
      categoryId: '456',
      name: 'Product 1',
      description: 'Description 1',
      price: 10,
      image: 'image1.jpg',
    }

    const productData2: ICreateProductDTO = {
      restaurantId: '123',
      categoryId: '456',
      name: 'Product 2',
      description: 'Description 2',
      price: 20,
      image: 'image2.jpg',
    }

    await productRepository.create(productData1)
    await productRepository.create(productData2)

    const products = await listProductUseCase.execute()

    expect(products).toHaveLength(2)
    expect(products[0]).toHaveProperty('name', productData1.name)
    expect(products[1]).toHaveProperty('name', productData2.name)
  })

  it('should return an empty list if no products are found', async () => {
    const products = await listProductUseCase.execute()
    expect(products).toHaveLength(0)
  })
})
