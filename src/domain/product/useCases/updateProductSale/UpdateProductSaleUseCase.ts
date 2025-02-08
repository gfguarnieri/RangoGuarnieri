import { IUpdateProductSaleDTO } from 'domain/product/dtos/IUpdateProductSaleDTO'
import { ProductSale } from 'domain/product/entities/ProductSale'
import { IProductRepository } from 'domain/product/repositories/IProductRepository'
import { IProductSaleDayRepository } from 'domain/product/repositories/IProductSaleDayRepository'
import { IProductSaleRepository } from 'domain/product/repositories/IProductSaleRepository'
import { DependencyInjectionTokens } from 'shared/container/DependencyInjectionTokens'
import { NotFoundValidationError } from 'shared/errors/NotFoundValidationError'
import { validateAllHours } from 'shared/validations/timeValidation'
import { inject, injectable } from 'tsyringe'

@injectable()
export class UpdateProductSaleUseCase {
  constructor(
    @inject(DependencyInjectionTokens.ProductSaleRepository)
    private productSaleRepository: IProductSaleRepository,
    @inject(DependencyInjectionTokens.ProductRepository)
    private productRepository: IProductRepository,
    @inject(DependencyInjectionTokens.ProductSaleDayRepository)
    private productSaleDayRepository: IProductSaleDayRepository,
  ) {}

  async execute(
    id: string,
    sale: IUpdateProductSaleDTO,
  ): Promise<ProductSale | undefined> {
    if (sale.productSaleDay) {
      validateAllHours(sale.productSaleDay)
    }

    const productSaleExists = await this.productSaleRepository.findById(id)
    if (!productSaleExists) {
      throw new NotFoundValidationError('Product Sale not found')
    }

    const product = await this.productRepository.findById(sale.productId)
    if (!product) {
      throw new NotFoundValidationError('Product not found')
    }

    if (sale.active) {
      await this.productSaleRepository.inactiveAll(sale.productId)
    }

    await this.productSaleRepository.update(id, sale)

    if (sale.productSaleDay) {
      const existingDays =
        await this.productSaleDayRepository.listByProductSaleId(
          productSaleExists.id!,
        )
      const newDays = sale.productSaleDay ?? []

      const daysToDelete = existingDays.filter(
        (existingDay) =>
          !newDays.some(
            (newHour) =>
              newHour.dayOfWeek === existingDay.dayOfWeek &&
              newHour.openingTime === existingDay.openingTime &&
              newHour.closingTime === existingDay.closingTime,
          ),
      )

      const daysToCreate = newDays.filter(
        (newDay) =>
          !existingDays.some(
            (existingDay) =>
              existingDay.dayOfWeek === newDay.dayOfWeek &&
              existingDay.openingTime === newDay.openingTime &&
              existingDay.closingTime === newDay.closingTime,
          ),
      )

      await Promise.all(
        daysToDelete.map((day) => {
          if (!day.id) return day
          return this.productSaleDayRepository.delete(day.id)
        }),
      )

      await Promise.all(
        daysToCreate.map((hour) =>
          this.productSaleDayRepository.create({
            ...hour,
            productSaleId: productSaleExists.id,
          }),
        ),
      )
    }

    const updatedProductSale = await this.productSaleRepository.findById(id)

    return updatedProductSale
  }
}
