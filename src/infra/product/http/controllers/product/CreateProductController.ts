import { Request, Response } from 'express'
import { z } from '@zod/i18n'
import { StatusCodes } from 'http-status-codes'
import { CreateProductUseCase } from 'domain/product/useCases/createProduct/CreateProductUseCase'
import { container } from 'tsyringe'

const schema = z.object({
  name: z.string().max(100).nonempty(),
  description: z.string().optional(),
  price: z.coerce.number().nonnegative().gt(0),
  categoryId: z.string().uuid().nonempty(),
  restaurantId: z.string().uuid().nonempty(),
})

export class CreateProductController {
  async handle(request: Request, response: Response): Promise<Response> {
    const validationResult = schema.safeParse(request.body)
    const file = request.file

    if (!file) {
      return response.status(StatusCodes.BAD_REQUEST).json({
        message: 'Image is required',
      })
    }

    if (!validationResult.success) {
      return response.status(StatusCodes.BAD_REQUEST).json({
        message: 'Verify the invalid fields',
        errors: validationResult.error.errors,
      })
    }

    const createProductUseCase = container.resolve(CreateProductUseCase)

    const product = await createProductUseCase.execute(
      {
        filebuffer: file.buffer,
        filename: file.filename,
        filemime: file.mimetype,
      },
      validationResult.data,
    )

    return response.status(StatusCodes.CREATED).send(product)
  }
}
