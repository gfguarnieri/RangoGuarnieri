import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { StatusCodes } from 'http-status-codes'
import { UpdateRestauranteUseCase } from '@domain/restaurant/useCase/updateRestaurant/UpdateRestaurantUseCase'

export class UpdateRestaurantController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params
    const { name, image } = request.body
    const updateRestaurantUseCase = container.resolve(UpdateRestauranteUseCase)
    const restaurant = await updateRestaurantUseCase.execute(id, {
      name,
      image,
    })
    return response.status(StatusCodes.OK).json(restaurant)
  }
}
