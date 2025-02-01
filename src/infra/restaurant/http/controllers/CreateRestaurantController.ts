import { CreateRestauranteUseCase } from '@domain/restaurant/useCase/createRestaurant/CreateRestaurantUseCase'
import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { StatusCodes } from 'http-status-codes'
import { z } from 'zod'
import { ValidationResources } from 'shared/resources/ValidationResources'

const schema = z.object({
  name: z.string().nonempty(ValidationResources.required),
  image: z.string().nonempty(ValidationResources.required),
  address: z.string().nonempty(ValidationResources.required),
  city: z.string().nonempty(ValidationResources.required),
  neighborhood: z.string().nonempty(ValidationResources.required),
  number: z.string().nonempty(ValidationResources.required),
  postalCode: z
    .string()
    .length(8, ValidationResources.strLength(8))
    .nonempty(ValidationResources.required),
  state: z.string().length(2, ValidationResources.strLength(2)),
})

export class CreateRestaurantController {
  async handle(request: Request, response: Response): Promise<Response> {
    const validationResult = schema.safeParse(request.body)

    if (!validationResult.success) {
      return response.status(StatusCodes.BAD_REQUEST).json({
        message: 'Verifique os campos inválidos',
        errors: validationResult.error.errors,
      })
    }

    const params = validationResult.data

    const createRestaurantUseCase = container.resolve(CreateRestauranteUseCase)

    const restaurant = await createRestaurantUseCase.execute(params)

    return response.status(StatusCodes.CREATED).json(restaurant)
  }
}
