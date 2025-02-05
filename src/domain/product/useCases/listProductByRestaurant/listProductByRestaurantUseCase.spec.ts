import 'reflect-metadata'
import { describe, it, expect, beforeEach } from 'vitest'
import { ListProductByRestaurantUseCase } from './listProductByRestaurantUseCase'
import { InMemoryProductRepository } from 'test/repositories/products/InMemoryProductRepository'
import { IProductRepository } from 'domain/product/repositories/IProductRepository'
import { IStorageProvider } from 'domain/core/providers/IStorageProvider'
import { InMemoryStorageProvider } from 'test/providers/InMemoryStorageProvider'
import { ICreateProductDTO } from 'domain/product/dtos/ICreateProductDTO'

let productRepository: IProductRepository
let storageProvider: IStorageProvider
let listProductByRestaurantUseCase: ListProductByRestaurantUseCase

describe('ListProductByRestaurantUseCase', () => {
  beforeEach(async () => {
    productRepository = new InMemoryProductRepository()
    storageProvider = new InMemoryStorageProvider()
    listProductByRestaurantUseCase = new ListProductByRestaurantUseCase(
      productRepository,
      storageProvider,
    )
  })

  it('should list products by restaurant id', async () => {
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

    const products = await listProductByRestaurantUseCase.execute('123')

    expect(products).toHaveLength(2)
    expect(products[0]).toHaveProperty('name', productData1.name)
    expect(products[1]).toHaveProperty('name', productData2.name)
  })

  it('should return an empty array if no products are found for the restaurant id', async () => {
    const products = await listProductByRestaurantUseCase.execute(
      'non-existent-restaurant-id',
    )

    expect(products).toHaveLength(0)
  })
})
