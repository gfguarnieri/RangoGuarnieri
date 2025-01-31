import { DeleteRestaurantUseCase } from '@domain/restaurant/useCase/deleteRestaurant/DeleteRestaurantUseCase'
import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { StatusCodes } from 'http-status-codes'

export class DeleteRestaurantController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params
    const deleteRestaurantUseCase = container.resolve(DeleteRestaurantUseCase)
    const restaurant = await deleteRestaurantUseCase.execute(id)
    return response.status(StatusCodes.OK).json(restaurant)
  }
}
