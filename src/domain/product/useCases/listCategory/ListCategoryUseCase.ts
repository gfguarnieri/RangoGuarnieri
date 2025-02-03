import { Category } from 'domain/product/entities/Category'
import { ICategoryRepository } from 'domain/product/repositories/ICategoryRepository'
import { DependencyInjectionTokens } from 'shared/container/DependencyInjectionTokens'
import { inject, injectable } from 'tsyringe'

@injectable()
export class ListCategoryUseCase {
  constructor(
    @inject(DependencyInjectionTokens.CategoryRepository)
    private categoryRepository: ICategoryRepository,
  ) {}

  async execute(): Promise<Category[]> {
    const categories = await this.categoryRepository.list()
    return categories
  }
}
