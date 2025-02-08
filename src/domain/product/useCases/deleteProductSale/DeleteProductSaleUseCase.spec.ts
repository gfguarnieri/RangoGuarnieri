import 'reflect-metadata'
import { describe, it, expect, beforeEach } from 'vitest'
import { DeleteProductSaleUseCase } from './DeleteProductSaleUseCase'
import { InMemoryProductSaleRepository } from 'test/repositories/products/InMemoryProductSaleRepository'
import { IProductSaleRepository } from 'domain/product/repositories/IProductSaleRepository'
import { NotFoundValidationError } from 'shared/errors/NotFoundValidationError'
import { ICreateProductSaleDTO } from 'domain/product/dtos/ICreateProductSaleDTO'
import { IProductRepository } from 'domain/product/repositories/IProductRepository'
import { InMemoryProductRepository } from 'test/repositories/products/InMemoryProductRepository'
import { Product } from 'domain/product/entities/Product'

let productSaleRepository: IProductSaleRepository
let productRepository: IProductRepository

let deleteProductSaleUseCase: DeleteProductSaleUseCase

describe('DeleteProductSaleUseCase', () => {
  beforeEach(() => {
    productSaleRepository = new InMemoryProductSaleRepository()
    productRepository = new InMemoryProductRepository()
    deleteProductSaleUseCase = new DeleteProductSaleUseCase(
      productSaleRepository,
      productRepository,
    )
  })

  it('should delete a product sale by id', async () => {
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
    }

    const productSale = await productSaleRepository.create(productSaleData)

    await deleteProductSaleUseCase.execute(
      productSale.productId,
      productSale.id!,
    )

    const foundProductSale = await productSaleRepository.findById(
      productSale.id!,
    )
    expect(foundProductSale).toBeUndefined()
  })

  it('should throw an error if the product sale does not exist', async () => {
    await expect(
      deleteProductSaleUseCase.execute('123', 'nonexistent-id'),
    ).rejects.toThrowError(NotFoundValidationError)
  })
})
