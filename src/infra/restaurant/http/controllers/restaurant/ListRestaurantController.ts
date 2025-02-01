import { ListRestaurantUseCase } from '@domain/restaurant/useCase/listRestaurant/ListRestaurantUseCase'
import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { StatusCodes } from 'http-status-codes'

export class ListRestaurantController {
  async handle(_request: Request, response: Response): Promise<Response> {
    const listRestaurantUseCase = container.resolve(ListRestaurantUseCase)
    const restaurants = await listRestaurantUseCase.execute()
    return response.status(StatusCodes.CREATED).json(restaurants)
  }
}
