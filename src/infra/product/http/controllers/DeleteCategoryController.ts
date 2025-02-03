import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { container } from 'tsyringe'
import { z } from '@zod/i18n'
import { DeleteCategoryUseCase } from 'domain/product/useCases/deleteCategory/DeleteCategoryUseCase'

const schema = z.object({
  id: z.string().uuid().nonempty(),
})

export class DeleteCategoryController {
  async handle(request: Request, response: Response): Promise<Response> {
    const validationResult = schema.safeParse(request.params)

    if (!validationResult.success) {
      return response.status(StatusCodes.BAD_REQUEST).json({
        message: 'Verify the invalid fields',
        errors: validationResult.error.errors,
      })
    }
    const deleteCategory = container.resolve(DeleteCategoryUseCase)
    await deleteCategory.execute(validationResult.data.id)
    return response.status(StatusCodes.NO_CONTENT).json()
  }
}
