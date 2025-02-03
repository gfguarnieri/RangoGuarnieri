import { Category } from 'domain/product/entities/Category'
import { ICategoryRepository } from 'domain/product/repositories/ICategoryRepository'
import { DependencyInjectionTokens } from 'shared/container/DependencyInjectionTokens'
import { NotFoundValidationError } from 'shared/errors/NotFoundValidationError'
import { inject, injectable } from 'tsyringe'

@injectable()
export class FindCategoryUseCase {
  constructor(
    @inject(DependencyInjectionTokens.CategoryRepository)
    private categoryRepository: ICategoryRepository,
  ) {}

  async execute(id: string): Promise<Category> {
    const category = await this.categoryRepository.findById(id)

    if (!category) {
      throw new NotFoundValidationError('Category not found')
    }

    return category
  }
}
