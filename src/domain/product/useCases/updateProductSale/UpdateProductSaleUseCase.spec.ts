import 'reflect-metadata'
import { describe, it, expect, beforeEach } from 'vitest'
import { UpdateProductSaleUseCase } from './UpdateProductSaleUseCase'
import { InMemoryProductSaleRepository } from 'test/repositories/products/InMemoryProductSaleRepository'
import { IProductSaleRepository } from 'domain/product/repositories/IProductSaleRepository'
import { IUpdateProductSaleDTO } from 'domain/product/dtos/IUpdateProductSaleDTO'
import { NotFoundValidationError } from 'shared/errors/NotFoundValidationError'
import { IProductRepository } from 'domain/product/repositories/IProductRepository'
import { IProductSaleDayRepository } from 'domain/product/repositories/IProductSaleDayRepository'
import { InMemoryProductRepository } from 'test/repositories/products/InMemoryProductRepository'
import { InMemoryProductSaleDayRepository } from 'test/repositories/products/InMemoryProductSaleDayRepository'
import { DayOfWeek } from 'domain/core/models/IHours'

let productSaleRepository: IProductSaleRepository
let productRepository: IProductRepository
let productSaleDayRepository: IProductSaleDayRepository

let updateProductSaleUseCase: UpdateProductSaleUseCase

describe('UpdateProductSaleUseCase', () => {
  beforeEach(async () => {
    productSaleRepository = new InMemoryProductSaleRepository()
    productRepository = new InMemoryProductRepository()
    productSaleDayRepository = new InMemoryProductSaleDayRepository()

    updateProductSaleUseCase = new UpdateProductSaleUseCase(
      productSaleRepository,
      productRepository,
      productSaleDayRepository,
    )
  })

  it('should update a product sale', async () => {
    const product = await productRepository.create({
      categoryId: '123',
      name: 'Product 1',
      description: 'Description 1',
      price: 10,
      restaurantId: '123',
      image: 'image1.jpg',
    })

    const productSaleCreated = await productSaleRepository.create({
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

    const productSaleUpdated = await updateProductSaleUseCase.execute(
      productSaleCreated.id!,
      {
        promotionPrice: 8,
        active: true,
        productId: product.id!,
        productSaleDay: [
          {
            dayOfWeek: DayOfWeek.THURSDAY,
            openingTime: '10:00',
            closingTime: '15:00',
          },
          {
            dayOfWeek: DayOfWeek.WEDNESDAY,
            openingTime: '10:00',
            closingTime: '15:00',
          },
        ],
        description: 'Promotion 2',
      },
    )

    expect(productSaleUpdated).toHaveProperty('id')
    expect(productSaleUpdated!.productId).toBe(product.id)
    expect(productSaleUpdated!.promotionPrice).toBe(8)
    expect(productSaleUpdated!.description).toBe('Promotion 2')
  })

  it('should throw an error if the product sale does not exist', async () => {
    const updateData: IUpdateProductSaleDTO = {
      description: 'Promotion 2',
      promotionPrice: 8,
      active: true,
      productId: '123',
      productSaleDay: [],
    }

    await expect(
      updateProductSaleUseCase.execute('123', updateData),
    ).rejects.toThrowError(NotFoundValidationError)
  })
})
