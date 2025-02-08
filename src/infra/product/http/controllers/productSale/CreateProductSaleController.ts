import { Request, Response } from 'express'
import { z } from '@zod/i18n'
import { DayOfWeek } from 'domain/core/models/IHours'
import { StatusCodes } from 'http-status-codes'
import { container } from 'tsyringe'
import { CreateProductSaleUseCase } from 'domain/product/useCases/createProductSale/CreateProductSaleUseCase'

const schema = z.object({
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
})

export class CreateProductSaleController {
  async handle(request: Request, response: Response): Promise<Response> {
    const validationResult = schema.safeParse(request.body)
    if (!validationResult.success) {
      return response.status(StatusCodes.BAD_REQUEST).json({
        message: 'Verify the invalid fields',
        errors: validationResult.error.errors,
      })
    }

    const params = validationResult.data

    const createProductSaleUseCase = container.resolve(CreateProductSaleUseCase)

    const productSale = await createProductSaleUseCase.execute({
      ...params,
    })

    return response.status(StatusCodes.CREATED).json(productSale)
  }
}
