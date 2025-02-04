import { Request, Response } from 'express'
import { z } from '@zod/i18n'
import { StatusCodes } from 'http-status-codes'
import { container } from 'tsyringe'
import { DeleteProductUseCase } from 'domain/product/useCases/deleteProduct/DeleteProductUseCase'

const schema = z.object({
  id: z.string().uuid().nonempty(),
})

export class DeleteProductController {
  async handle(request: Request, response: Response): Promise<Response> {
    const validationResult = schema.safeParse(request.params)

    if (!validationResult.success) {
      return response.status(StatusCodes.BAD_REQUEST).json({
        message: 'Verify the invalid fields',
        errors: validationResult.error.errors,
      })
    }

    const deleteProductUseCase = container.resolve(DeleteProductUseCase)

    await deleteProductUseCase.execute(validationResult.data.id)

    return response.status(StatusCodes.NO_CONTENT).send()
  }
}
