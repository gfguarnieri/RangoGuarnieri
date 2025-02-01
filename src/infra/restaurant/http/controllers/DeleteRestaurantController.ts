import { DeleteRestaurantUseCase } from '@domain/restaurant/useCase/deleteRestaurant/DeleteRestaurantUseCase'
import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { StatusCodes } from 'http-status-codes'
import { ValidationResources } from 'shared/resources/ValidationResources'
import { z } from 'zod'

const schema = z.object({
  id: z.string().uuid(ValidationResources.invalidUUID),
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
