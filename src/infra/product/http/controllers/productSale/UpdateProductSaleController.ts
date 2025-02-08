import { Request, Response } from 'express'
import { z } from '@zod/i18n'
import { DayOfWeek } from 'domain/core/models/IHours'
import { StatusCodes } from 'http-status-codes'
import { container } from 'tsyringe'
import { UpdateProductSaleUseCase } from 'domain/product/useCases/updateProductSale/UpdateProductSaleUseCase'

const schema = z.object({
  params: z.object({
    id: z.string().uuid().nonempty(),
  }),
  body: z.object({
    productId: z.string().uuid().nonempty(),
    promotionPrice: z.number().gte(0.1),
    description: z.string().max(100).nonempty(),
    active: z.boolean(),
    productSaleDay: z
      .array(
        z.object({
          openingTime: z.string().length(5).nonempty(),
          closingTime: z.string().length(5).nonempty(),
          dayOfWeek: z.nativeEnum(DayOfWeek),
        }),
      )
      .optional(),
  }),
})

export class UpdateProductSaleController {
  async handle(request: Request, response: Response): Promise<Response> {
    const validationResult = schema.safeParse(request)

    if (!validationResult.success) {
      return response.status(StatusCodes.BAD_REQUEST).json({
        message: 'Verify the invalid fields',
        errors: validationResult.error.errors,
      })
    }

    const updateProductSaleUseCase = container.resolve(UpdateProductSaleUseCase)
    const requestData = validationResult.data

    const productSale = await updateProductSaleUseCase.execute(
      requestData.params.id,
      { ...requestData.body },
    )

    return response.status(StatusCodes.OK).json(productSale)
  }
}
