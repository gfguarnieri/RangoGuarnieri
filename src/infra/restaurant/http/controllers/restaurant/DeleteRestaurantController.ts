import { DeleteRestaurantUseCase } from '@domain/restaurant/useCases/deleteRestaurant/DeleteRestaurantUseCase'
import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { StatusCodes } from 'http-status-codes'
import { z } from '@zod/i18n'

const schema = z.object({
  id: z.string().uuid(),
})

export class DeleteRestaurantController {
  async handle(request: Request, response: Response): Promise<Response> {
    const validationResult = schema.safeParse(request.params)

    if (!validationResult.success) {
      return response.status(StatusCodes.BAD_REQUEST).json({
        message: 'Invalid params',
        errors: validationResult.error.errors,
      })
    }

    const { id } = validationResult.data

    const deleteRestaurantUseCase = container.resolve(DeleteRestaurantUseCase)
    const restaurant = await deleteRestaurantUseCase.execute(id)
    return response.status(StatusCodes.OK).json(restaurant)
  }
}
