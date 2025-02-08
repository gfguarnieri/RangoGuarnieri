import { Router } from 'express'
import { CreateProductSaleController } from '../controllers/productSale/CreateProductSaleController'
import { UpdateProductSaleController } from '../controllers/productSale/UpdateProductSaleController'
import { DeleteProductSaleController } from '../controllers/productSale/DeleteProductSaleController'
import { ListProductSaleByProductController } from '../controllers/productSale/ListProductSaleByProductController'

const productSalesRoutes = Router()

const createProductSaleController = new CreateProductSaleController()
const updateProductSaleController = new UpdateProductSaleController()
const deleteProductSaleController = new DeleteProductSaleController()
const listProductSaleByProductController =
  new ListProductSaleByProductController()

productSalesRoutes.post('/', createProductSaleController.handle)
productSalesRoutes.put('/:id', updateProductSaleController.handle)
productSalesRoutes.delete('/:id/:productId', deleteProductSaleController.handle)
productSalesRoutes.get(
  '/product/:id',
  listProductSaleByProductController.handle,
)

export { productSalesRoutes }
