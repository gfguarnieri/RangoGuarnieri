import { ListCategoryByRestaurantUseCase } from 'domain/product/useCases/listCategoryByRestaurant/ListCategoryByRestaurantUseCase'
import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { container } from 'tsyringe'
import { z } from '@zod/i18n'

const schema = z.object({
  restaurantId: z.string().uuid().nonempty(),
})

export class ListCategoryByRestaurantController {
  async handle(request: Request, response: Response): Promise<Response> {
    const validationResult = schema.safeParse(request.params)

    if (!validationResult.success) {
      return response.status(StatusCodes.BAD_REQUEST).json({
        message: 'Verify the invalid fields',
        errors: validationResult.error.errors,
      })
    }

    const listCategoryByRestaurant = container.resolve(
      ListCategoryByRestaurantUseCase,
    )

    const categories = await listCategoryByRestaurant.execute(
      validationResult.data.restaurantId,
    )

    return response.status(StatusCodes.OK).json(categories)
  }
}
