import { IRestaurantRepository } from '@domain/restaurant/repositories/IRestaurantRepository'
import { IFileUploaded } from 'domain/core/models/IFileUploaded'
import { IStorageProvider } from 'domain/core/providers/IStorageProvider'
import { ICreateProductDTO } from 'domain/product/dtos/ICreateProductDTO'
import { Product } from 'domain/product/entities/Product'
import { ProductBucket } from 'domain/product/models/IProduct'
import { ICategoryRepository } from 'domain/product/repositories/ICategoryRepository'
import { IProductRepository } from 'domain/product/repositories/IProductRepository'
import { DependencyInjectionTokens } from 'shared/container/DependencyInjectionTokens'
import { NotFoundValidationError } from 'shared/errors/NotFoundValidationError'
import { UseCaseValidationError } from 'shared/errors/UseCaseValidationError'
import { inject, injectable } from 'tsyringe'

@injectable()
export class CreateProductUseCase {
  constructor(
    @inject(DependencyInjectionTokens.RestaurantRepository)
    private restaurantRepository: IRestaurantRepository,
    @inject(DependencyInjectionTokens.CategoryRepository)
    private categoryRepository: ICategoryRepository,
    @inject(DependencyInjectionTokens.ProductRepository)
    private productRepository: IProductRepository,
    @inject(DependencyInjectionTokens.StorageProvider)
    private storageProvider: IStorageProvider,
  ) {}

  async execute(
    file: IFileUploaded,
    data: ICreateProductDTO,
  ): Promise<Product> {
    if (!file || !file.filebuffer || !file.filemime) {
      throw new UseCaseValidationError('Image is required')
    }

    const restaurant = await this.restaurantRepository.findById(
      data.restaurantId,
    )

    if (!restaurant) {
      throw new NotFoundValidationError('Restaurant not found')
    }

    const category = await this.categoryRepository.findById(data.categoryId)

    if (!category) {
      throw new NotFoundValidationError('Category not found')
    }

    const imageOutput = await this.storageProvider.upload(file, ProductBucket)

    data.image = imageOutput

    const product = await this.productRepository.create(data)

    return product
  }
}
