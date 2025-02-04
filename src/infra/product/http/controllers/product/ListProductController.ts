import { ListProductUseCase } from 'domain/product/useCases/listProduct/ListProductUseCase'
import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { container } from 'tsyringe'

export class ListProductController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listProductUseCase = container.resolve(ListProductUseCase)
    const products = await listProductUseCase.execute()
    return response.status(StatusCodes.OK).send(products)
  }
}
