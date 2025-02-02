import { DayOfWeek } from '@domain/restaurant/models/IRestaurantHours'
import { UpdateAllRestaurantHoursUseCase } from '@domain/restaurant/useCases/updateAllRestaurantHours/UpdateAllRestaurantHoursUseCase'
import { z } from '@zod/i18n'
import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { container } from 'tsyringe'

const requestSchema = z.object({
  params: z.object({
    id: z.string().uuid().nonempty(),
  }),
  body: z.object({
    restaurantHours: z.array(
      z
        .object({
          openingTime: z.string().nonempty(),
          closingTime: z.string().nonempty(),
          dayOfWeek: z.nativeEnum(DayOfWeek),
        })
        .required(),
    ),
  }),
})

export class UpdateAllRestaurantHoursController {
  async handle(request: Request, response: Response): Promise<Response> {
    const validationResult = requestSchema.safeParse(request)

    if (!validationResult.success) {
      return response.status(StatusCodes.BAD_REQUEST).json({
        message: 'Verify the invalid fields',
        errors: validationResult.error.errors,
      })
    }

    const updateAllRestaurantHoursUseCase = container.resolve(
      UpdateAllRestaurantHoursUseCase,
    )
    const requestData = validationResult.data

    await updateAllRestaurantHoursUseCase.execute(
      requestData.params.id,
      requestData.body.restaurantHours,
    )

    return response.status(StatusCodes.NO_CONTENT).json()
  }
}
