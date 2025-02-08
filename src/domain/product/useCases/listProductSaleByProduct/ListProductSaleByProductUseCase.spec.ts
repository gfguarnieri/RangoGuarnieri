import 'reflect-metadata'
import { describe, it, expect, beforeEach } from 'vitest'
import { ListProductSaleByProductUseCase } from './ListProductSaleByProductUseCase'
import { InMemoryProductSaleRepository } from 'test/repositories/products/InMemoryProductSaleRepository'
import { IProductSaleRepository } from 'domain/product/repositories/IProductSaleRepository'
import { NotFoundValidationError } from 'shared/errors/NotFoundValidationError'
import { IProductRepository } from 'domain/product/repositories/IProductRepository'
import { InMemoryProductRepository } from 'test/repositories/products/InMemoryProductRepository'
import { Product } from 'domain/product/entities/Product'
import { ICreateProductSaleDTO } from 'domain/product/dtos/ICreateProductSaleDTO'
import { DayOfWeek } from 'domain/core/models/IHours'

let productSaleRepository: IProductSaleRepository
let productRepository: IProductRepository
let listProductSaleByProductUseCase: ListProductSaleByProductUseCase

describe('ListProductSaleByProductUseCase', () => {
  beforeEach(() => {
    productSaleRepository = new InMemoryProductSaleRepository()
    productRepository = new InMemoryProductRepository()
    listProductSaleByProductUseCase = new ListProductSaleByProductUseCase(
      productSaleRepository,
      productRepository,
    )
  })

  it('should list all product sales for a given product id', async () => {
    const productData: Product = {
      name: 'Product 1',
      description: 'Description 1',
      price: 10,
      image: 'image1.jpg',
      categoryId: 'category-id',
      restaurantId: 'restaurant-id',
    }

    const createdProduct = await productRepository.create(productData)

    const productSaleData: ICreateProductSaleDTO = {
      productId: createdProduct.id!,
      promotionPrice: 100,
      active: true,
      description: 'Description 1',
      productSaleDay: [
        {
          closingTime: '18:00',
          dayOfWeek: DayOfWeek.FRIDAY,
          openingTime: '08:00',
        },
      ],
    }

    await productSaleRepository.create(productSaleData)

    const productSales = await listProductSaleByProductUseCase.execute(
      createdProduct.id!,
    )

    expect(productSales).toHaveLength(1)
    expect(productSales[0].productId).toBe(createdProduct.id)
  })

  it('should throw an error if the product does not exist', async () => {
    await expect(
      listProductSaleByProductUseCase.execute('321'),
    ).rejects.toThrowError(NotFoundValidationError)
  })
})
