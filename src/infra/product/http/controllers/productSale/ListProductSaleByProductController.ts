import { Request, Response } from 'express'
import { z } from '@zod/i18n'
import { StatusCodes } from 'http-status-codes'
import { ListProductSaleByProductUseCase } from 'domain/product/useCases/listProductSaleByProduct/ListProductSaleByProductUseCase'
import { container } from 'tsyringe'

const schema = z.object({
  id: z.string().uuid().nonempty(),
})

export class ListProductSaleByProductController {
  async handle(request: Request, response: Response): Promise<Response> {
    const validationResult = schema.safeParse(request.params)

    if (!validationResult.success) {
      return response.status(StatusCodes.BAD_REQUEST).json({
        message: 'Verify the invalid fields',
        errors: validationResult.error.errors,
      })
    }

    const listProductSaleByProductUseCase = container.resolve(
      ListProductSaleByProductUseCase,
    )

    const productSales = await listProductSaleByProductUseCase.execute(
      validationResult.data.id,
    )

    return response.status(StatusCodes.OK).json(productSales)
  }
}
