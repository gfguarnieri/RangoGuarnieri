import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { container } from 'tsyringe'
import { z } from '@zod/i18n'
import { UpdateCategoryUseCase } from 'domain/product/useCases/updateCategory/UpdateCategoryUseCase'

const schema = z.object({
  params: z.object({
    id: z.string().uuid().nonempty(),
  }),
  body: z.object({
    name: z.string().max(100).nonempty(),
    restaurantId: z.string().uuid().nonempty(),
  }),
})

export class UpdateCategoryController {
  async handle(request: Request, response: Response): Promise<Response> {
    const validationResult = schema.safeParse(request)

    if (!validationResult.success) {
      return response.status(StatusCodes.BAD_REQUEST).json({
        message: 'Verify the invalid fields',
        errors: validationResult.error.errors,
      })
    }

    const updateCategory = container.resolve(UpdateCategoryUseCase)
    const { params, body } = validationResult.data
    const category = await updateCategory.execute(params.id, body)
    return response.status(StatusCodes.OK).json(category)
  }
}
