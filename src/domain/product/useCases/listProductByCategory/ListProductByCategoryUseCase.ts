import { IStorageProvider } from 'domain/core/providers/IStorageProvider'
import { Product } from 'domain/product/entities/Product'
import { ProductBucket } from 'domain/product/models/IProduct'
import { IProductRepository } from 'domain/product/repositories/IProductRepository'
import { DependencyInjectionTokens } from 'shared/container/DependencyInjectionTokens'
import { verifySalePrice } from 'shared/validations/salePriceValidation'
import { inject, injectable } from 'tsyringe'

@injectable()
export class ListProductByCategoryUseCase {
  constructor(
    @inject(DependencyInjectionTokens.ProductRepository)
    private productRepository: IProductRepository,
    @inject(DependencyInjectionTokens.StorageProvider)
    private storageProvider: IStorageProvider,
  ) {}

  async execute(categoryId: string): Promise<Product[]> {
    const products = await this.productRepository.listByCategoryId(categoryId)
    return products.map((product) => {
      if (product.image) {
        product.image = this.storageProvider.getUrl(
          product.image,
          ProductBucket,
        )
        verifySalePrice(product.productSale!, product)
      }
      return product
    })
  }
}
