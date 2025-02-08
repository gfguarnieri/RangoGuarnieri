import { IRestaurantRepository } from '@domain/restaurant/repositories/IRestaurantRepository'
import { IStorageProvider } from 'domain/core/providers/IStorageProvider'
import { IUpdateProductDTO } from 'domain/product/dtos/IUpdateProductDTO'
import { Product } from 'domain/product/entities/Product'
import { ProductBucket } from 'domain/product/models/IProduct'
import { ICategoryRepository } from 'domain/product/repositories/ICategoryRepository'
import { IProductRepository } from 'domain/product/repositories/IProductRepository'
import { IProductSaleRepository } from 'domain/product/repositories/IProductSaleRepository'
import { DependencyInjectionTokens } from 'shared/container/DependencyInjectionTokens'
import { NotFoundValidationError } from 'shared/errors/NotFoundValidationError'
import { UseCaseValidationError } from 'shared/errors/UseCaseValidationError'
import { inject, injectable } from 'tsyringe'

@injectable()
export class UpdateProductUseCase {
  constructor(
    @inject(DependencyInjectionTokens.ProductRepository)
    private productRepository: IProductRepository,
    @inject(DependencyInjectionTokens.CategoryRepository)
    private categoryRespository: ICategoryRepository,
    @inject(DependencyInjectionTokens.RestaurantRepository)
    private restaurantRepository: IRestaurantRepository,
    @inject(DependencyInjectionTokens.ProductSaleRepository)
    private productSaleRepository: IProductSaleRepository,
    @inject(DependencyInjectionTokens.StorageProvider)
    private storageProvider: IStorageProvider,
  ) {}

  async execute(id: string, data: IUpdateProductDTO): Promise<Product> {
    const category = await this.categoryRespository.exists(data.categoryId)

    if (!category) {
      throw new NotFoundValidationError('Category not found')
    }

    const restaurant = await this.restaurantRepository.exists(data.restaurantId)

    if (!restaurant) {
      throw new NotFoundValidationError('Restaurant not found')
    }

    const product = await this.productRepository.findById(id)

    if (!product) {
      throw new NotFoundValidationError('Product not found')
    }

    const productSale = await this.productSaleRepository.getActiveSale(id)

    if (productSale && productSale.promotionPrice > data.price) {
      throw new UseCaseValidationError(
        'Product price cannot be less than the active promotion price',
      )
    }

    const updatedProduct = await this.productRepository.update(id, data)

    updatedProduct!.image = this.storageProvider.getUrl(
      product.image!,
      ProductBucket,
    )

    return updatedProduct!
  }
}
