import { Request, Response } from 'express'
import { z } from '@zod/i18n'
import { StatusCodes } from 'http-status-codes'
import { container } from 'tsyringe'
import { UpdateProductImageUseCase } from 'domain/product/useCases/updateProductImage/UpdateProductImageUseCase'

const schema = z.object({
  id: z.string().uuid().nonempty(),
})

export class UpdateProductImageController {
  async handle(request: Request, response: Response): Promise<Response> {
    const validationResult = schema.safeParse(request.params)

    if (!validationResult.success) {
      return response.status(StatusCodes.BAD_REQUEST).json({
        message: 'Verify the invalid fields',
        errors: validationResult.error.errors,
      })
    }

    const file = request.file

    if (!file) {
      return response.status(StatusCodes.BAD_REQUEST).json({
        message: 'Image is required',
      })
    }

    const { filename, mimetype, buffer } = file

    const updateImageProductUseCase = container.resolve(
      UpdateProductImageUseCase,
    )

    const product = await updateImageProductUseCase.execute(
      validationResult.data.id,
      {
        filename,
        filemime: mimetype,
        filebuffer: buffer,
      },
    )

    return response.status(StatusCodes.OK).json(product)
  }
}
