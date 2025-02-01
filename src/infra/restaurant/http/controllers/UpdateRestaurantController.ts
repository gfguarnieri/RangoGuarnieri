import { UpdateRestauranteUseCase } from '@domain/restaurant/useCase/updateRestaurant/UpdateRestaurantUseCase'
import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { StatusCodes } from 'http-status-codes'
import { ValidationResources } from 'shared/resources/ValidationResources'
import { z } from 'zod'

const requestSchema = z.object({
  params: z.object({
    id: z
      .string()
      .uuid(ValidationResources.invalidUUID)
      .nonempty(ValidationResources.required),
  }),
  body: z.object({
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
  }),
})

export class UpdateRestaurantController {
  async handle(request: Request, response: Response): Promise<Response> {
    const validationResult = requestSchema.safeParse(request)

    if (!validationResult.success) {
      return response.status(StatusCodes.BAD_REQUEST).json({
        message: 'Verifique os campos inválidos',
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
