import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { container } from 'tsyringe'
import { z } from '@zod/i18n'
import { ListProductByRestaurantUseCase } from 'domain/product/useCases/listProductByRestaurant/listProductByRestaurantUseCase'

const schema = z.object({
  id: z.string().uuid().nonempty(),
})

export class ListProductByRestaurantController {
  async handle(request: Request, response: Response): Promise<Response> {
    const validationResult = schema.safeParse(request.params)

    if (!validationResult.success) {
      return response.status(StatusCodes.BAD_REQUEST).json({
        message: 'Verify the invalid fields',
        errors: validationResult.error.errors,
      })
    }

    const listProductUseCase = container.resolve(ListProductByRestaurantUseCase)

    const { id } = validationResult.data
    const products = await listProductUseCase.execute(id)
    return response.status(StatusCodes.OK).send(products)
  }
}
