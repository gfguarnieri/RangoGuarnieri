import 'reflect-metadata'
import { InMemoryCategoryRepository } from 'test/repositories/products/InMemoryCategoryRepository'
import { beforeAll, describe, expect, it } from 'vitest'
import { InMemoryStorageProvider } from 'test/providers/InMemoryStorageProvider'
import { CreateProductUseCase } from './CreateProductUseCase'
import { InMemoryProductRepository } from 'test/repositories/products/InMemoryProductRepository'
import { InMemoryRestaurantRepository } from 'test/repositories/restaurant/InMemoryRestaurantRepository'
import { IFileUploaded } from 'domain/core/models/IFileUploaded'
import { ICategoryRepository } from 'domain/product/repositories/ICategoryRepository'
import { IRestaurantRepository } from '@domain/restaurant/repositories/IRestaurantRepository'
import { IProductRepository } from 'domain/product/repositories/IProductRepository'
import { IStorageProvider } from 'domain/core/providers/IStorageProvider'

let categoryRepository: ICategoryRepository
let restaurantRepository: IRestaurantRepository
let productRepository: IProductRepository
let storageProvider: IStorageProvider

let createProductUseCase: CreateProductUseCase

describe('CreateProductUseCase', async () => {
  beforeAll(async () => {
    categoryRepository = new InMemoryCategoryRepository()
    restaurantRepository = new InMemoryRestaurantRepository()
    storageProvider = new InMemoryStorageProvider()
    productRepository = new InMemoryProductRepository()
    createProductUseCase = new CreateProductUseCase(
      restaurantRepository,
      categoryRepository,
      productRepository,
      storageProvider,
    )
  })

  it('should create a product', async () => {
    const restaurant = await restaurantRepository.create({
      name: 'Restaurante Guarnieri',
      image: 'test-image-url',
      address: 'Rua José',
      number: '123',
      city: 'Sorocaba',
      state: 'SP',
      postalCode: '18065-511',
      neighborhood: 'Jardim Paulista',
    })

    if (!restaurant || !restaurant.id) {
      throw new Error('Restaurant not created')
    }

    const category = await categoryRepository.create({
      name: 'Category',
      restaurantId: restaurant.id,
    })

    if (!category || !category.id) {
      throw new Error('Category not created')
    }

    const file: IFileUploaded = {
      filename: 'image.jpg',
      filebuffer: Buffer.from(''),
      filemime: 'image/jpeg',
    }

    const product = await createProductUseCase.execute(file, {
      name: 'Product',
      description: 'Description',
      price: 10,
      categoryId: category.id,
      restaurantId: restaurant.id,
    })

    expect(product).toHaveProperty('id')
  })

  it('should throw an error if restaurant does not exist', async () => {
    const file: IFileUploaded = {
      filename: 'image.jpg',
      filebuffer: Buffer.from(''),
      filemime: 'image/jpeg',
    }

    await expect(
      createProductUseCase.execute(file, {
        name: 'Product',
        description: 'Description',
        price: 10,
        categoryId: '123',
        restaurantId: '123',
      }),
    ).rejects.toThrow('Restaurant not found')
  })

  it('should throw an error if category does not exist', async () => {
    const restaurant = await restaurantRepository.create({
      name: 'Restaurante Guarnieri',
      image: 'test-image-url',
      address: 'Rua José',
      number: '123',
      city: 'Sorocaba',
      state: 'SP',
      postalCode: '18065-511',
      neighborhood: 'Jardim Paulista',
    })

    if (!restaurant || !restaurant.id) {
      throw new Error('Restaurant not created')
    }

    const file: IFileUploaded = {
      filename: 'image.jpg',
      filebuffer: Buffer.from(''),
      filemime: 'image/jpeg',
    }

    await expect(
      createProductUseCase.execute(file, {
        name: 'Product',
        description: 'Description',
        price: 10,
        categoryId: '123',
        restaurantId: restaurant.id,
      }),
    ).rejects.toThrow('Category not found')
  })

  it('should throw an error if no file is provided', async () => {
    const restaurant = await restaurantRepository.create({
      name: 'Restaurante Guarnieri',
      image: 'test-image-url',
      address: 'Rua José',
      number: '123',
      city: 'Sorocaba',
      state: 'SP',
      postalCode: '18065-511',
      neighborhood: 'Jardim Paulista',
    })

    if (!restaurant || !restaurant.id) {
      throw new Error('Restaurant not created')
    }

    const category = await categoryRepository.create({
      name: 'Category',
      restaurantId: restaurant.id,
    })

    if (!category || !category.id) {
      throw new Error('Category not created')
    }

    await expect(
      createProductUseCase.execute(
        {
          filebuffer: Buffer.from(''),
          filename: '',
          filemime: '',
        },
        {
          name: 'Product',
          description: 'Description',
          price: 10,
          categoryId: category.id,
          restaurantId: restaurant.id,
        },
      ),
    ).rejects.toThrow('Image is required')
  })
})
