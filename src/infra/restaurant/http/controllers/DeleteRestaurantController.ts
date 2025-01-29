import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { StatusCodes } from 'http-status-codes'
import { DeleteRestaurantUseCase } from '@domain/restaurant/useCase/deleteRestaurant/DeleteRestaurantUseCase'

export class DeleteRestaurantController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params
    const deleteRestaurantController = container.resolve(
      DeleteRestaurantUseCase,
    )
    const restaurant = await deleteRestaurantController.execute(id)
    return response.status(StatusCodes.OK).json(restaurant)
  }
}
