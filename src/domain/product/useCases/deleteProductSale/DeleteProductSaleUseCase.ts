import { IProductRepository } from 'domain/product/repositories/IProductRepository'
import { IProductSaleRepository } from 'domain/product/repositories/IProductSaleRepository'
import { DependencyInjectionTokens } from 'shared/container/DependencyInjectionTokens'
import { NotFoundValidationError } from 'shared/errors/NotFoundValidationError'
import { inject, injectable } from 'tsyringe'

@injectable()
export class DeleteProductSaleUseCase {
  constructor(
    @inject(DependencyInjectionTokens.ProductSaleRepository)
    private productSaleRepository: IProductSaleRepository,
    @inject(DependencyInjectionTokens.ProductRepository)
    private productRepository: IProductRepository,
  ) {}

  async execute(productId: string, id: string): Promise<void> {
    const product = await this.productRepository.findById(productId)

    if (!product) {
      throw new NotFoundValidationError('Product not found')
    }

    const productSale = await this.productSaleRepository.findById(id)

    if (!productSale) {
      throw new NotFoundValidationError('Product Sale not found')
    }

    await this.productSaleRepository.delete(productId, id)
  }
}
