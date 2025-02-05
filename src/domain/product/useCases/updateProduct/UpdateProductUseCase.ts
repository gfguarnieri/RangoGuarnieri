import { IRestaurantRepository } from '@domain/restaurant/repositories/IRestaurantRepository'
import { IStorageProvider } from 'domain/core/providers/IStorageProvider'
import { IUpdateProductDTO } from 'domain/product/dtos/IUpdateProductDTO'
import { IProduct, ProductBucket } from 'domain/product/models/IProduct'
import { ICategoryRepository } from 'domain/product/repositories/ICategoryRepository'
import { IProductRepository } from 'domain/product/repositories/IProductRepository'
import { DependencyInjectionTokens } from 'shared/container/DependencyInjectionTokens'
import { NotFoundValidationError } from 'shared/errors/NotFoundValidationError'
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
    @inject(DependencyInjectionTokens.StorageProvider)
    private storageProvider: IStorageProvider,
  ) {}

  async execute(id: string, data: IUpdateProductDTO): Promise<IProduct> {
    const category = await this.categoryRespository.findById(data.categoryId)

    if (!category) {
      throw new NotFoundValidationError('Category not found')
    }

    const restaurant = await this.restaurantRepository.findById(
      data.restaurantId,
    )

    if (!restaurant) {
      throw new NotFoundValidationError('Restaurant not found')
    }

    const product = await this.productRepository.findById(id)

    if (!product) {
      throw new NotFoundValidationError('Product not found')
    }

    const updatedProduct = await this.productRepository.update(id, data)

    updatedProduct!.image = this.storageProvider.getUrl(
      product.image!,
      ProductBucket,
    )

    return updatedProduct!
  }
}
