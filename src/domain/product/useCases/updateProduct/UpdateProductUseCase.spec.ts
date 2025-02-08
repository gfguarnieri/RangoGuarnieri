import 'reflect-metadata'
import { describe, it, expect, beforeEach } from 'vitest'
import { UpdateProductUseCase } from './UpdateProductUseCase'
import { InMemoryProductRepository } from 'test/repositories/products/InMemoryProductRepository'
import { ICreateProductDTO } from 'domain/product/dtos/ICreateProductDTO'
import { IProductRepository } from 'domain/product/repositories/IProductRepository'
import { NotFoundValidationError } from 'shared/errors/NotFoundValidationError'
import { IUpdateProductDTO } from 'domain/product/dtos/IUpdateProductDTO'
import { InMemoryRestaurantRepository } from 'test/repositories/restaurant/InMemoryRestaurantRepository'
import { ICategoryRepository } from 'domain/product/repositories/ICategoryRepository'
import { InMemoryCategoryRepository } from 'test/repositories/products/InMemoryCategoryRepository'
import { IStorageProvider } from 'domain/core/providers/IStorageProvider'
import { InMemoryStorageProvider } from 'test/providers/InMemoryStorageProvider'
import { IRestaurantRepository } from '@domain/restaurant/repositories/IRestaurantRepository'
import { IProductSaleRepository } from 'domain/product/repositories/IProductSaleRepository'
import { InMemoryProductSaleRepository } from 'test/repositories/products/InMemoryProductSaleRepository'
import { UseCaseValidationError } from 'shared/errors/UseCaseValidationError'

let productRepository: IProductRepository
let productSaleRepository: IProductSaleRepository
let restaurantRepository: IRestaurantRepository
let categoryRepository: ICategoryRepository
let storageProvider: IStorageProvider
let updateProductUseCase: UpdateProductUseCase

describe('UpdateProductUseCase', () => {
  beforeEach(async () => {
    productRepository = new InMemoryProductRepository()
    restaurantRepository = new InMemoryRestaurantRepository()
    categoryRepository = new InMemoryCategoryRepository()
    storageProvider = new InMemoryStorageProvider()
    productSaleRepository = new InMemoryProductSaleRepository()
    updateProductUseCase = new UpdateProductUseCase(
      productRepository,
      categoryRepository,
      restaurantRepository,
      productSaleRepository,
      storageProvider,
    )
  })

  it('should update a product', async () => {
    const restaurantData = {
      name: 'Restaurante Guarnieri',
      image: 'guarnieri-logo',
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

    const categoryData = {
      name: 'Categoria 1',
      restaurantId: createdRestaurant.id,
    }

    const createdCategory = await categoryRepository.create(categoryData)

    if (!createdCategory || !createdCategory.id) {
      throw new Error('Error creating category')
    }

    const productData: ICreateProductDTO = {
      restaurantId: createdRestaurant.id,
      categoryId: createdCategory.id,
      name: 'Product 1',
      description: 'Description 1',
      price: 10,
    }

    const createdProduct = await productRepository.create(productData)

    const updateData: IUpdateProductDTO = {
      name: 'Updated Product',
      description: 'Updated Description',
      price: 20,
      restaurantId: createdRestaurant.id,
      categoryId: createdCategory.id,
    }

    const updatedProduct = await updateProductUseCase.execute(
      createdProduct.id!,
      updateData,
    )

    expect(updatedProduct).toHaveProperty('name', updateData.name)
    expect(updatedProduct).toHaveProperty('description', updateData.description)
    expect(updatedProduct).toHaveProperty('price', updateData.price)
  })

  it('should throw an error if the product does not exist', async () => {
    const restaurantData = {
      name: 'Restaurante Guarnieri',
      image: 'guarnieri-logo',
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

    const categoryData = {
      name: 'Categoria 1',
      restaurantId: createdRestaurant.id,
    }

    const createdCategory = await categoryRepository.create(categoryData)

    if (!createdCategory || !createdCategory.id) {
      throw new Error('Error creating category')
    }

    const updateData: IUpdateProductDTO = {
      name: 'Updated Product',
      description: 'Updated Description',
      price: 20,
      restaurantId: createdRestaurant.id,
      categoryId: createdCategory.id,
    }

    const promise = updateProductUseCase.execute('invalid-id', updateData)

    await expect(promise).rejects.toThrowError(NotFoundValidationError)
  })

  it('should throw an error if the price is lower than the active promotion price', async () => {
    const restaurantData = {
      name: 'Restaurante Guarnieri',
      image: 'guarnieri-logo',
      address: 'Rua José',
      number: '123',
      city: 'Sorocaba',
      state: 'SP',
      neighborhood: 'Jardim Paulista',
      postalCode: '18065-511',
      restaurantHours: [],
    }

    const createdRestaurant = await restaurantRepository.create(restaurantData)

    const categoryData = {
      name: 'Categoria 1',
      restaurantId: createdRestaurant.id!,
    }

    const createdCategory = await categoryRepository.create(categoryData)

    const productData: ICreateProductDTO = {
      restaurantId: createdRestaurant.id!,
      categoryId: createdCategory.id!,
      name: 'Product 1',
      description: 'Description 1',
      price: 10,
    }

    const createdProduct = await productRepository.create(productData)

    const productSaleData = {
      active: true,
      productId: createdProduct.id!,
      promotionPrice: 5,
      description: 'Promotion 1',
      productSaleDay: [],
    }

    const createdProductSale =
      await productSaleRepository.create(productSaleData)

    if (!createdProductSale || !createdProductSale.id) {
      throw new Error('Error creating product sale')
    }

    const updateData: IUpdateProductDTO = {
      name: 'Updated Product',
      description: 'Updated Description',
      price: 3,
      restaurantId: createdRestaurant.id!,
      categoryId: createdCategory.id!,
    }

    const promise = updateProductUseCase.execute(createdProduct.id!, updateData)

    await expect(promise).rejects.toThrowError(UseCaseValidationError)
  })
})
