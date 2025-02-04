import { IStorageProvider } from 'domain/core/providers/IStorageProvider'
import { IProduct, ProductBucket } from 'domain/product/models/IProduct'
import { IProductRepository } from 'domain/product/repositories/IProductRepository'
import { DependencyInjectionTokens } from 'shared/container/DependencyInjectionTokens'
import { NotFoundValidationError } from 'shared/errors/NotFoundValidationError'
import { inject, injectable } from 'tsyringe'

@injectable()
export class FindProductUseCase {
  constructor(
    @inject(DependencyInjectionTokens.ProductRepository)
    private productRepository: IProductRepository,
    @inject(DependencyInjectionTokens.StorageProvider)
    private storageProvider: IStorageProvider,
  ) {}

  async execute(id: string): Promise<IProduct | undefined> {
    const product = await this.productRepository.findById(id)

    if (!product || !product.image) {
      throw new NotFoundValidationError('Product not found')
    }

    product.image = await this.storageProvider.getUrl(
      product.image,
      ProductBucket,
    )

    return product
  }
}
