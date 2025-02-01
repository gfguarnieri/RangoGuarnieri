import { FindRestaurantUseCase } from '@domain/restaurant/useCase/findRestaurant/FindRestaurantUseCase'
import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { container } from 'tsyringe'
import { z } from '@zod/i18n'

const schema = z.object({
  id: z.string().uuid(),
})

export class FindRestaurantController {
  async handle(request: Request, response: Response): Promise<Response> {
    const validationResult = schema.safeParse(request.params)

    if (!validationResult.success) {
      return response.status(StatusCodes.BAD_REQUEST).json({
        message: 'Invalid params',
        errors: validationResult.error.errors,
      })
    }

    const { id } = validationResult.data

    const findRestaurantUseCase = container.resolve(FindRestaurantUseCase)
    const restaurant = await findRestaurantUseCase.execute(id)

    return response.status(StatusCodes.OK).json(restaurant)
  }
}
