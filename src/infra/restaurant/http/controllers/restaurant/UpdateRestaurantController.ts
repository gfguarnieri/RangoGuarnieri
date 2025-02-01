import { UpdateRestauranteUseCase } from '@domain/restaurant/useCase/updateRestaurant/UpdateRestaurantUseCase'
import { DayOfWeek } from '@domain/restaurant/models/IRestaurantHours'
import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { StatusCodes } from 'http-status-codes'
import { z } from '@zod/i18n'

const requestSchema = z.object({
  params: z.object({
    id: z.string().uuid().nonempty(),
  }),
  body: z.object({
    name: z.string().max(100).nonempty(),
    image: z.string().max(255).nonempty(),
    address: z.string().max(150).nonempty(),
    city: z.string().max(50).nonempty(),
    neighborhood: z.string().max(50).nonempty(),
    number: z.string().max(20).nonempty(),
    postalCode: z.string().length(8).nonempty(),
    state: z.string().length(2).nonempty(),
    restaurantHours: z.array(
      z.object({
        openingTime: z.string().nonempty(),
        closingTime: z.string().nonempty(),
        dayOfWeek: z.nativeEnum(DayOfWeek),
      }),
    ),
  }),
})

export class UpdateRestaurantController {
  async handle(request: Request, response: Response): Promise<Response> {
    const validationResult = requestSchema.safeParse(request)

    if (!validationResult.success) {
      return response.status(StatusCodes.BAD_REQUEST).json({
        message: 'Verify the invalid fields',
        errors: validationResult.error.errors,
      })
    }

    const updateRestaurantUseCase = container.resolve(UpdateRestauranteUseCase)
    const requestData = validationResult.data

    const restaurant = await updateRestaurantUseCase.execute(
      requestData.params.id,
      requestData.body,
    )

    return response.status(StatusCodes.OK).json(restaurant)
  }
}
