import { Router } from 'express'
import { CreateProductController } from '../controllers/product/CreateProductController'
import { MulterConfig } from 'shared/infra/http/middlewares/MulterConfig'
import { ListProductController } from '../controllers/product/ListProductController'
import { DeleteProductController } from '../controllers/product/DeleteProductController'

const productsRoutes = Router()

const createProductController = new CreateProductController()
const listProductController = new ListProductController()
const deleteProductController = new DeleteProductController()

productsRoutes.get('/', listProductController.handle)
productsRoutes.post(
  '/',
  MulterConfig().single('image'),
  createProductController.handle,
)
productsRoutes.delete('/:id', deleteProductController.handle)

export { productsRoutes }
