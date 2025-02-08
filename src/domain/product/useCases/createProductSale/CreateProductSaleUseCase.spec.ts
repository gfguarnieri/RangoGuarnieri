import 'reflect-metadata'
import { describe, it, expect, beforeEach } from 'vitest'
import { CreateProductSaleUseCase } from './CreateProductSaleUseCase'
import { InMemoryProductSaleRepository } from 'test/repositories/products/InMemoryProductSaleRepository'
import { IProductSaleRepository } from 'domain/product/repositories/IProductSaleRepository'
import { IProductRepository } from 'domain/product/repositories/IProductRepository'
import { InMemoryProductRepository } from 'test/repositories/products/InMemoryProductRepository'
import { InMemoryProductSaleDayRepository } from 'test/repositories/products/InMemoryProductSaleDayRepository'
import { IProductSaleDayRepository } from 'domain/product/repositories/IProductSaleDayRepository'
import { DayOfWeek } from 'domain/core/models/IHours'

let productSaleRepository: IProductSaleRepository
let productRepository: IProductRepository
let productSaleDayRepository: IProductSaleDayRepository

let createProductSaleUseCase: CreateProductSaleUseCase

describe('CreateProductSaleUseCase', () => {
  beforeEach(async () => {
    productSaleRepository = new InMemoryProductSaleRepository()
    productRepository = new InMemoryProductRepository()
    productSaleDayRepository = new InMemoryProductSaleDayRepository()

    createProductSaleUseCase = new CreateProductSaleUseCase(
      productSaleRepository,
      productRepository,
      productSaleDayRepository,
    )
  })

  it('should create a product sale', async () => {
    const product = await productRepository.create({
      categoryId: '123',
      name: 'Product 1',
      description: 'Description 1',
      price: 10,
      restaurantId: '123',
      image: 'image1.jpg',
    })

    const productSale = await createProductSaleUseCase.execute({
      active: true,
      productId: product.id!,
      promotionPrice: 5,
      description: 'Promotion 1',
      productSaleDay: [
        {
          dayOfWeek: DayOfWeek.SUNDAY,
          openingTime: '10:00',
          closingTime: '15:00',
        },
        {
          dayOfWeek: DayOfWeek.MONDAY,
          openingTime: '10:00',
          closingTime: '15:00',
        },
      ],
    })

    expect(productSale).toHaveProperty('id')
    expect(productSale.productId).toBe(product.id)
    expect(productSale.promotionPrice).toBe(5)
    expect(productSale.description).toBe('Promotion 1')
    expect(productSale.productSaleDay).toHaveLength(2)
  })

  it('should throw an error if the sale price is lesser than the product price', async () => {
    const product = await productRepository.create({
      categoryId: '123',
      name: 'Product 1',
      description: 'Description 1',
      price: 10,
      restaurantId: '123',
      image: 'image1.jpg',
    })

    await expect(
      createProductSaleUseCase.execute({
        active: true,
        productId: product.id!,
        promotionPrice: 15,
        description: 'Promotion 1',
        productSaleDay: [
          {
            dayOfWeek: DayOfWeek.SUNDAY,
            openingTime: '10:00',
            closingTime: '15:00',
          },
        ],
      }),
    ).rejects.toThrowError(
      'Promotion price cannot be greater than the product price',
    )
  })

  it('should throw an error if the product does not exist', async () => {
    await expect(
      createProductSaleUseCase.execute({
        active: true,
        productId: 'non-existent-product-id',
        promotionPrice: 5,
        description: 'Promotion 1',
        productSaleDay: [
          {
            dayOfWeek: DayOfWeek.SUNDAY,
            openingTime: '10:00',
            closingTime: '15:00',
          },
        ],
      }),
    ).rejects.toThrowError('Product not found')
  })

  it('should inactivate all other sales if the new sale is active', async () => {
    const product = await productRepository.create({
      categoryId: '123',
      name: 'Product 1',
      description: 'Description 1',
      price: 10,
      restaurantId: '123',
      image: 'image1.jpg',
    })

    const productSale1 = await createProductSaleUseCase.execute({
      active: true,
      productId: product.id!,
      promotionPrice: 5,
      description: 'Promotion 1',
      productSaleDay: [
        {
          dayOfWeek: DayOfWeek.SUNDAY,
          openingTime: '10:00',
          closingTime: '15:00',
        },
      ],
    })

    const productSale2 = await createProductSaleUseCase.execute({
      active: true,
      productId: product.id!,
      promotionPrice: 5,
      description: 'Promotion 2',
      productSaleDay: [
        {
          dayOfWeek: DayOfWeek.SUNDAY,
          openingTime: '10:00',
          closingTime: '15:00',
        },
      ],
    })

    const productSale3 = await createProductSaleUseCase.execute({
      active: false,
      productId: product.id!,
      promotionPrice: 5,
      description: 'Promotion 3',
      productSaleDay: [
        {
          dayOfWeek: DayOfWeek.SUNDAY,
          openingTime: '10:00',
          closingTime: '15:00',
        },
      ],
    })

    const productSale4 = await createProductSaleUseCase.execute({
      active: true,
      productId: product.id!,
      promotionPrice: 5,
      description: 'Promotion 4',
      productSaleDay: [
        {
          dayOfWeek: DayOfWeek.SUNDAY,
          openingTime: '10:00',
          closingTime: '11:00',
        },
      ],
    })

    expect(productSale1.active).toBe(false)
    expect(productSale2.active).toBe(false)
    expect(productSale3.active).toBe(false)
    expect(productSale4.active).toBe(true)
  })
})
