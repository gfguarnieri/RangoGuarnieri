import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { StatusCodes } from 'http-status-codes'
import { z } from '@zod/i18n'
import { ListRestaurantHoursUseCase } from '@domain/restaurant/useCase/listRestaurantHours/ListRestaurantHoursUseCase'

const requestSchema = z.object({
  params: z.object({
    id: z.string().uuid().nonempty(),
  }),
})

export class ListRestauranthoursController {
  async handle(request: Request, response: Response): Promise<Response> {
    const validationResult = requestSchema.safeParse(request)

    if (!validationResult.success) {
      return response.status(StatusCodes.BAD_REQUEST).json({
        message: 'Verify the invalid param',
        errors: validationResult.error.errors,
      })
    }

    const id = validationResult.data.params.id

    const listRestaurantHoursUseCase = container.resolve(
      ListRestaurantHoursUseCase,
    )
    const hours = await listRestaurantHoursUseCase.execute(id)

    return response.status(StatusCodes.OK).json(hours)
  }
}
