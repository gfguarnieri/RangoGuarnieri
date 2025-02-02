import { CreateRestauranteUseCase } from '@domain/restaurant/useCase/createRestaurant/CreateRestaurantUseCase'
import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { StatusCodes } from 'http-status-codes'
import { DayOfWeek } from '@domain/restaurant/models/IRestaurantHours'
import { z } from '@zod/i18n'

const schema = z.object({
  name: z.string().max(100).nonempty(),
  address: z.string().max(150).nonempty(),
  city: z.string().max(50).nonempty(),
  neighborhood: z.string().max(50).nonempty(),
  number: z.string().max(20).nonempty(),
  postalCode: z.string().length(8).nonempty(),
  state: z.string().length(2).nonempty(),
  restaurantHours: z
    .array(
      z.object({
        openingTime: z.string().length(5).nonempty(),
        closingTime: z.string().length(5).nonempty(),
        dayOfWeek: z.nativeEnum(DayOfWeek),
      }),
    )
    .optional(),
})

export class CreateRestaurantController {
  async handle(request: Request, response: Response): Promise<Response> {
    const validationResult = schema.safeParse(request.body)

    if (!validationResult.success) {
      return response.status(StatusCodes.BAD_REQUEST).json({
        message: 'Verify the invalid fields',
        errors: validationResult.error.errors,
      })
    }

    const params = validationResult.data

    const createRestaurantUseCase = container.resolve(CreateRestauranteUseCase)

    const restaurant = await createRestaurantUseCase.execute({
      ...params,
    })

    return response.status(StatusCodes.CREATED).json(restaurant)
  }
}
