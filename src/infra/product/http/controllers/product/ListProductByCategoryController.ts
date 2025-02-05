import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { container } from 'tsyringe'
import { z } from '@zod/i18n'
import { ListProductByCategoryUseCase } from 'domain/product/useCases/listProductByCategory/ListProductByCategoryUseCase'

const schema = z.object({
  id: z.string().uuid().nonempty(),
})

export class ListProductByCategoryController {
  async handle(request: Request, response: Response): Promise<Response> {
    const validationResult = schema.safeParse(request.params)

    if (!validationResult.success) {
      return response.status(StatusCodes.BAD_REQUEST).json({
        message: 'Verify the invalid fields',
        errors: validationResult.error.errors,
      })
    }

    const listProductUseCase = container.resolve(ListProductByCategoryUseCase)

    const { id } = validationResult.data
    const products = await listProductUseCase.execute(id)
    return response.status(StatusCodes.OK).send(products)
  }
}
