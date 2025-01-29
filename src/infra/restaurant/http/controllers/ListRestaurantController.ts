import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { StatusCodes } from 'http-status-codes'
import { ListRestaurantUseCase } from '@domain/restaurant/useCase/listRestaurant/ListRestaurantUseCase'

export class ListRestaurantController {
  async handle(_request: Request, response: Response): Promise<Response> {
    const listRestaurantUseCase = container.resolve(ListRestaurantUseCase)
    const restaurant = await listRestaurantUseCase.execute()
    return response.status(StatusCodes.CREATED).json(restaurant)
  }
}
