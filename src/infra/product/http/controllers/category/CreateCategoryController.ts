import { CreateCategoryUseCase } from 'domain/product/useCases/createCategory/CreateCategoryUseCase'
import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { container } from 'tsyringe'
import { z } from '@zod/i18n'

const schema = z.object({
  name: z.string().max(100).nonempty(),
  restaurantId: z.string().uuid().nonempty(),
})

export class CreateCategoryController {
  async handle(request: Request, response: Response): Promise<Response> {
    const validationResult = schema.safeParse(request.body)

    if (!validationResult.success) {
      return response.status(StatusCodes.BAD_REQUEST).json({
        message: 'Verify the invalid fields',
        errors: validationResult.error.errors,
      })
    }

    const createCategory = container.resolve(CreateCategoryUseCase)

    const category = await createCategory.execute(validationResult.data)

    return response.status(StatusCodes.CREATED).json(category)
  }
}
