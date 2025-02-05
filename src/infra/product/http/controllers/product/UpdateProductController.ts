import { Request, Response } from 'express'
import { z } from '@zod/i18n'
import { StatusCodes } from 'http-status-codes'
import { UpdateProductUseCase } from 'domain/product/useCases/updateProduct/UpdateProductUseCase'
import { container } from 'tsyringe'

const schema = z.object({
  params: z.object({
    id: z.string().uuid().nonempty(),
  }),
  body: z.object({
    name: z.string().max(100).nonempty(),
    description: z.string().max(255).nonempty(),
    price: z.number().positive().gt(0),
    categoryId: z.string().uuid().nonempty(),
    restaurantId: z.string().uuid().nonempty(),
  }),
})

export class UpdateProductController {
  async handle(request: Request, response: Response): Promise<Response> {
    const validationResult = schema.safeParse(request)

    if (!validationResult.success) {
      return response.status(StatusCodes.BAD_REQUEST).json({
        message: 'Verify the invalid fields',
        errors: validationResult.error.errors,
      })
    }

    const updateProductUseCase = container.resolve(UpdateProductUseCase)

    const { id } = validationResult.data.params
    const data = validationResult.data.body

    const product = await updateProductUseCase.execute(id, data)

    return response.status(StatusCodes.OK).json(product)
  }
}
