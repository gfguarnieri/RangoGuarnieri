import { Router } from 'express'
import { CreateProductController } from '../controllers/product/CreateProductController'
import { MulterConfig } from 'shared/infra/http/middlewares/MulterConfig'
import { ListProductController } from '../controllers/product/ListProductController'
import { DeleteProductController } from '../controllers/product/DeleteProductController'
import { UpdateProductImageController } from '../controllers/product/UpdateProductImageController'
import { UpdateProductController } from '../controllers/product/UpdateProductController'

const productsRoutes = Router()

const createProductController = new CreateProductController()
const updateProductController = new UpdateProductController()
const listProductController = new ListProductController()
const deleteProductController = new DeleteProductController()
const updateProductImageController = new UpdateProductImageController()

productsRoutes.get('/', listProductController.handle)

productsRoutes.post(
  '/',
  MulterConfig().single('image'),
  createProductController.handle,
)

productsRoutes.put('/:id', updateProductController.handle)

productsRoutes.delete('/:id', deleteProductController.handle)

productsRoutes.patch(
  '/:id',
  MulterConfig().single('image'),
  updateProductImageController.handle,
)

export { productsRoutes }
