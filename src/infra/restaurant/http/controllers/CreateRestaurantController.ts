import { CreateRestauranteUseCase } from '@domain/restaurant/useCase/createRestaurant/CreateRestaurantUseCase'
import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { StatusCodes } from 'http-status-codes'

export class CreateRestaurantController {
  async handle(request: Request, response: Response): Promise<Response> {
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

    const createRestaurantUseCase = container.resolve(CreateRestauranteUseCase)

    const restaurant = await createRestaurantUseCase.execute({
      name,
      image,
      address,
      city,
      neighborhood,
      number,
      postalCode,
      state,
    })

    return response.status(StatusCodes.CREATED).json(restaurant)
  }
}
