import { Request, Response } from 'express'
import { z } from '@zod/i18n'
import { StatusCodes } from 'http-status-codes'
import { container } from 'tsyringe'
import { FindProductUseCase } from 'domain/product/useCases/findProduct/FindProductUseCase'

const schema = z.object({
  id: z.string().uuid(),
})

export class FindProductController {
  async handle(request: Request, response: Response): Promise<Response> {
    const validationResult = schema.safeParse(request.params)

    if (!validationResult.success) {
      return response.status(StatusCodes.BAD_REQUEST).json({
        message: 'Invalid params',
        errors: validationResult.error.errors,
      })
    }

    const { id } = validationResult.data

    const findProductUseCase = container.resolve(FindProductUseCase)
    const product = await findProductUseCase.execute(id)

    return response.status(StatusCodes.OK).json(product)
  }
}
