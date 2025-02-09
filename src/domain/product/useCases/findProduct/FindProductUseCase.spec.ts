import 'reflect-metadata'
import { describe, it, expect, beforeEach } from 'vitest'
import { FindProductUseCase } from './FindProductUseCase'
import { InMemoryProductRepository } from 'test/repositories/products/InMemoryProductRepository'
import { ICreateProductDTO } from 'domain/product/dtos/ICreateProductDTO'
import { IProductRepository } from 'domain/product/repositories/IProductRepository'
import { NotFoundValidationError } from 'shared/errors/NotFoundValidationError'
import { IStorageProvider } from 'domain/core/providers/IStorageProvider'
import { InMemoryStorageProvider } from 'test/providers/InMemoryStorageProvider'
import { IProductSaleRepository } from 'domain/product/repositories/IProductSaleRepository'
import { InMemoryProductSaleRepository } from 'test/repositories/products/InMemoryProductSaleRepository'
import { DayOfWeek } from 'domain/core/models/IHours'
import { getCurrentDayOfWeekAndHour } from 'shared/validations/timeValidation'

let productRepository: IProductRepository
let productSaleRepository: IProductSaleRepository
let storageProvider: IStorageProvider

let findProductUseCase: FindProductUseCase

describe('FindProductUseCase', () => {
  beforeEach(async () => {
    productRepository = new InMemoryProductRepository()
    productSaleRepository = new InMemoryProductSaleRepository()
    storageProvider = new InMemoryStorageProvider()

    findProductUseCase = new FindProductUseCase(
      productRepository,
      storageProvider,
      productSaleRepository,
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

  it('should show promotion price if product is on sale', async () => {
    const productData: ICreateProductDTO = {
      restaurantId: '123',
      categoryId: '456',
      name: 'Product 1',
      description: 'Description 1',
      price: 10,
      image: 'image1.jpg',
    }

    const product = await productRepository.create(productData)

    product.productSale = {
      productId: product.id!,
      promotionPrice: 5,
      active: true,
      description: 'Description 1',
      productSaleDay: [
        {
          closingTime: '23:59',
          dayOfWeek: getCurrentDayOfWeekAndHour().dayOfWeek as DayOfWeek,
          openingTime: '00:00',
        },
      ],
    }

    const foundProduct = await findProductUseCase.execute(product.id!)
    expect(foundProduct?.currentPrice).equal(
      product.productSale?.promotionPrice,
    )
  })

  it('should show regular price if product is not on sale', async () => {
    const productData: ICreateProductDTO = {
      restaurantId: '123',
      categoryId: '456',
      name: 'Product 1',
      description: 'Description 1',
      price: 10,
      image: 'image1.jpg',
    }

    const product = await productRepository.create(productData)

    const foundProduct = await findProductUseCase.execute(product.id!)
    expect(foundProduct?.currentPrice).equal(product.price)
  })

  it('should throw an error if the product does not exist', async () => {
    await expect(
      findProductUseCase.execute('non-existent-id'),
    ).rejects.toThrowError(NotFoundValidationError)
  })
})
