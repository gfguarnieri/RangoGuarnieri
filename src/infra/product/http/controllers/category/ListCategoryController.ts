import { ListCategoryUseCase } from 'domain/product/useCases/listCategory/ListCategoryUseCase'
import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { container } from 'tsyringe'

export class ListCategoryController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listCategoryUseCase = container.resolve(ListCategoryUseCase)
    const categories = await listCategoryUseCase.execute()
    return response.status(StatusCodes.OK).json(categories)
  }
}
