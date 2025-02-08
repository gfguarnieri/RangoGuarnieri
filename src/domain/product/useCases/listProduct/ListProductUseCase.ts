import { IStorageProvider } from 'domain/core/providers/IStorageProvider'
import { Product } from 'domain/product/entities/Product'
import { ProductBucket } from 'domain/product/models/IProduct'
import { IProductRepository } from 'domain/product/repositories/IProductRepository'
import { DependencyInjectionTokens } from 'shared/container/DependencyInjectionTokens'
import { inject, injectable } from 'tsyringe'

@injectable()
export class ListProductUseCase {
  constructor(
    @inject(DependencyInjectionTokens.ProductRepository)
    private productRepository: IProductRepository,
    @inject(DependencyInjectionTokens.StorageProvider)
    private storageProvider: IStorageProvider,
  ) {}

  async execute(): Promise<Product[]> {
    const products = await this.productRepository.list()
    return products.map((product) => {
      if (product.image) {
        product.image = this.storageProvider.getUrl(
          product.image,
          ProductBucket,
        )
        product.price = Number(product.price)
      }
      return product
    })
  }
}
