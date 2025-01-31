import { UpdateRestauranteUseCase } from '@domain/restaurant/useCase/updateRestaurant/UpdateRestaurantUseCase'
import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { StatusCodes } from 'http-status-codes'

export class UpdateRestaurantController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params
    const {
      name,
      image,
      address,
      city,
      neighborhood,
      number,
      postalCode,
      state,
    } = request.body

    const updateRestaurantUseCase = container.resolve(UpdateRestauranteUseCase)

    const restaurant = await updateRestaurantUseCase.execute(id, {
      name,
      image,
      address,
      city,
      neighborhood,
      number,
      postalCode,
      state,
    })

    return response.status(StatusCodes.OK).json(restaurant)
  }
}
