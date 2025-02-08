import { ICategoryRepository } from 'domain/product/repositories/ICategoryRepository'
import { DependencyInjectionTokens } from 'shared/container/DependencyInjectionTokens'
import { NotFoundValidationError } from 'shared/errors/NotFoundValidationError'
import { inject, injectable } from 'tsyringe'

@injectable()
export class DeleteCategoryUseCase {
  constructor(
    @inject(DependencyInjectionTokens.CategoryRepository)
    private categoryRepository: ICategoryRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const category = await this.categoryRepository.exists(id)

    if (!category) {
      throw new NotFoundValidationError('Category not found')
    }

    await this.categoryRepository.delete(id)
  }
}
