import { ProductSale } from 'domain/product/entities/ProductSale'
import { IProductRepository } from 'domain/product/repositories/IProductRepository'
import { IProductSaleRepository } from 'domain/product/repositories/IProductSaleRepository'
import { DependencyInjectionTokens } from 'shared/container/DependencyInjectionTokens'
import { NotFoundValidationError } from 'shared/errors/NotFoundValidationError'
import { inject, injectable } from 'tsyringe'

@injectable()
export class ListProductSaleByProductUseCase {
  constructor(
    @inject(DependencyInjectionTokens.ProductSaleRepository)
    private productSaleRepository: IProductSaleRepository,
    @inject(DependencyInjectionTokens.ProductRepository)
    private productRepository: IProductRepository,
  ) {}

  async execute(productId: string): Promise<ProductSale[]> {
    const product = await this.productRepository.exists(productId)
    if (!product) {
      throw new NotFoundValidationError('Product not found')
    }

    const productSale =
      await this.productSaleRepository.listByProductId(productId)
    if (!productSale) {
      throw new NotFoundValidationError('Product Sale not found')
    }

    return productSale
  }
}
