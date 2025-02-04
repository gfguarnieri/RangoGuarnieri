import { IStorageProvider } from 'domain/core/providers/IStorageProvider'
import { ProductBucket } from 'domain/product/models/IProduct'
import { IProductRepository } from 'domain/product/repositories/IProductRepository'
import { DependencyInjectionTokens } from 'shared/container/DependencyInjectionTokens'
import { NotFoundValidationError } from 'shared/errors/NotFoundValidationError'
import { inject, injectable } from 'tsyringe'

@injectable()
export class DeleteProductUseCase {
  constructor(
    @inject(DependencyInjectionTokens.ProductRepository)
    private productRepository: IProductRepository,
    @inject(DependencyInjectionTokens.StorageProvider)
    private storageProvider: IStorageProvider,
  ) {}

  async execute(id: string): Promise<void> {
    const product = await this.productRepository.findById(id)

    if (!product) {
      throw new NotFoundValidationError('Product not found')
    }

    if (product.image) {
      await this.storageProvider.delete(product.image, ProductBucket)
    }

    await this.productRepository.delete(id)
  }
}
