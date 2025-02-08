import { ICreateProductSaleDTO } from 'domain/product/dtos/ICreateProductSaleDTO'
import { ProductSale } from 'domain/product/entities/ProductSale'
import { IProductRepository } from 'domain/product/repositories/IProductRepository'
import { IProductSaleDayRepository } from 'domain/product/repositories/IProductSaleDayRepository'
import { IProductSaleRepository } from 'domain/product/repositories/IProductSaleRepository'
import { DependencyInjectionTokens } from 'shared/container/DependencyInjectionTokens'
import { NotFoundValidationError } from 'shared/errors/NotFoundValidationError'
import { UseCaseValidationError } from 'shared/errors/UseCaseValidationError'
import { validateAllHours } from 'shared/validations/timeValidation'
import { inject, injectable } from 'tsyringe'

@injectable()
export class CreateProductSaleUseCase {
  constructor(
    @inject(DependencyInjectionTokens.ProductSaleRepository)
    private productSaleRepository: IProductSaleRepository,
    @inject(DependencyInjectionTokens.ProductRepository)
    private productRepository: IProductRepository,
    @inject(DependencyInjectionTokens.ProductSaleDayRepository)
    private productSaleDayRepository: IProductSaleDayRepository,
  ) {}

  async execute(sale: ICreateProductSaleDTO): Promise<ProductSale> {
    if (sale.productSaleDay) {
      validateAllHours(sale.productSaleDay)
    }

    const product = await this.productRepository.findById(sale.productId)
    if (!product) {
      throw new NotFoundValidationError('Product not found')
    }

    if (product.price <= sale.promotionPrice) {
      throw new UseCaseValidationError(
        'Promotion price cannot be greater than the product price',
      )
    }

    if (sale.active) {
      await this.productSaleRepository.inactiveAll(sale.productId)
    }

    const productSaleCreated = await this.productSaleRepository.create(sale)

    if (sale.productSaleDay) {
      const createdSaleDay = await Promise.all(
        sale.productSaleDay.map(async (day) => {
          day.productSaleId = productSaleCreated.id
          return await this.productSaleDayRepository.create(day)
        }),
      )
      productSaleCreated.productSaleDay = createdSaleDay
    }

    return productSaleCreated
  }
}
