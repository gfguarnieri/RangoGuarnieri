import { Router } from 'express'
import { CreateProductController } from '../controllers/product/CreateProductController'
import { MulterConfig } from 'shared/infra/http/middlewares/MulterConfig'
import { ListProductController } from '../controllers/product/ListProductController'
import { DeleteProductController } from '../controllers/product/DeleteProductController'
import { UpdateProductImageController } from '../controllers/product/UpdateProductImageController'
import { UpdateProductController } from '../controllers/product/UpdateProductController'
import { ListProductByCategoryController } from '../controllers/product/ListProductByCategoryController'
import { ListProductByRestaurantController } from '../controllers/product/ListProductByRestaurantController'

const productsRoutes = Router()

const createProductController = new CreateProductController()
const updateProductController = new UpdateProductController()
const listProductController = new ListProductController()
const listProductByCategoryController = new ListProductByCategoryController()
const listProductByRestaurantController =
  new ListProductByRestaurantController()
const deleteProductController = new DeleteProductController()
const updateProductImageController = new UpdateProductImageController()

productsRoutes.get('/', listProductController.handle)
productsRoutes.get('/category/:id', listProductByCategoryController.handle)
productsRoutes.get('/restaurant/:id', listProductByRestaurantController.handle)
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
