import { FindCategoryUseCase } from 'domain/product/useCases/findCategory/FindCategoryUseCase'
import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { z } from '@zod/i18n'
import { StatusCodes } from 'http-status-codes'

const schema = z.object({
  id: z.string().uuid().nonempty(),
})

export class FindCategoryController {
  async handle(request: Request, response: Response): Promise<Response> {
    const validationResult = schema.safeParse(request.params)

    if (!validationResult.success) {
      return response.status(StatusCodes.BAD_REQUEST).json({
        message: 'Verify the invalid fields',
        errors: validationResult.error.errors,
      })
    }

    const findCategoryUseCase = container.resolve(FindCategoryUseCase)
    const category = await findCategoryUseCase.execute(request.params.id)

    return response.status(StatusCodes.OK).json(category)
  }
}
