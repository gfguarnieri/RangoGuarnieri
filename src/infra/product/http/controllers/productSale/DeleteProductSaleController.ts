import { Request, Response } from 'express'
import { z } from '@zod/i18n'
import { StatusCodes } from 'http-status-codes'
import { container } from 'tsyringe'
import { DeleteProductSaleUseCase } from 'domain/product/useCases/deleteProductSale/DeleteProductSaleUseCase'

const schema = z.object({
  id: z.string().uuid().nonempty(),
  productId: z.string().uuid().nonempty(),
})

export class DeleteProductSaleController {
  async handle(request: Request, response: Response): Promise<Response> {
    console.log('oi')
    const validationResult = schema.safeParse(request.params)

    if (!validationResult.success) {
      return response.status(StatusCodes.BAD_REQUEST).json({
        message: 'Verify the invalid fields',
        errors: validationResult.error.errors,
      })
    }

    const deleteProductCaseUseCase = container.resolve(DeleteProductSaleUseCase)

    const { id, productId } = validationResult.data

    await deleteProductCaseUseCase.execute(productId, id)

    return response.status(StatusCodes.NO_CONTENT).send()
  }
}
