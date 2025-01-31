import { FindRestaurantUseCase } from '@domain/restaurant/useCase/findRestaurant/FindRestaurantUseCase'
import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { container } from 'tsyringe'

export class FindRestaurantController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const findRestaurantUseCase = container.resolve(FindRestaurantUseCase)
    const restaurant = await findRestaurantUseCase.execute(id)

    if (!restaurant) {
      return response
        .status(StatusCodes.NOT_FOUND)
        .json({ message: 'Restaurant not found' })
    }

    return response.status(StatusCodes.OK).json(restaurant)
  }
}
