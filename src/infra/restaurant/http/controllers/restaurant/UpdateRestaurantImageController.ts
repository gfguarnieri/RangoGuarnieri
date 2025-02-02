import { Request, Response } from 'express'
import { UpdateRestauranteImageUseCase } from '@domain/restaurant/useCases/updateRestaurantImage/UpdateRestaurantImageUseCase'
import { container } from 'tsyringe'
import { StatusCodes } from 'http-status-codes'

export class UpdateRestauranteImageController {
  async handle(request: Request, response: Response): Promise<Response> {
    const updateRestaurantImageUseCase = container.resolve(
      UpdateRestauranteImageUseCase,
    )
    const { id } = request.params
    const file = request.file

    if (!file) {
      return response.status(StatusCodes.BAD_REQUEST).json({
        message: 'Image is required',
      })
    }
    const restaurant = await updateRestaurantImageUseCase.execute({
      restaurantId: id,
      file: {
        filebuffer: file.buffer,
        filemime: file.mimetype,
        filename: file.filename,
      },
    })
    return response.status(StatusCodes.OK).send(restaurant)
  }
}
