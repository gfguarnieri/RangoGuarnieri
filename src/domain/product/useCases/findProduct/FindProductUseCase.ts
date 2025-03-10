import { IStorageProvider } from 'domain/core/providers/IStorageProvider'
import { Product } from 'domain/product/entities/Product'
import { ProductBucket } from 'domain/product/models/IProduct'
import { IProductRepository } from 'domain/product/repositories/IProductRepository'
import { IProductSaleRepository } from 'domain/product/repositories/IProductSaleRepository'
import { DependencyInjectionTokens } from 'shared/container/DependencyInjectionTokens'
import { NotFoundValidationError } from 'shared/errors/NotFoundValidationError'
import { verifySalePrice } from 'shared/validations/salePriceValidation'
import { inject, injectable } from 'tsyringe'

@injectable()
export class FindProductUseCase {
  constructor(
    @inject(DependencyInjectionTokens.ProductRepository)
    private productRepository: IProductRepository,
    @inject(DependencyInjectionTokens.StorageProvider)
    private storageProvider: IStorageProvider,
    @inject(DependencyInjectionTokens.ProductSaleRepository)
    private productSaleRepository: IProductSaleRepository,
  ) {}

  async execute(id: string): Promise<Product | undefined> {
    const product = await this.productRepository.findById(id)

    if (!product || !product.image) {
      throw new NotFoundValidationError('Product not found')
    }

    product.image = await this.storageProvider.getUrl(
      product.image,
      ProductBucket,
    )

    verifySalePrice(product.productSale!, product)

    return product
  }
}
