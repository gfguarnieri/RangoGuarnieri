import { Router } from 'express'
import { CreateProductSaleController } from '../controllers/productSale/CreateProductSaleController'
import { UpdateProductSaleController } from '../controllers/productSale/UpdateProductSaleController'
import { DeleteProductSaleController } from '../controllers/productSale/DeleteProductSaleController'

const productSalesRoutes = Router()

const createProductSaleController = new CreateProductSaleController()
const updateProductSaleController = new UpdateProductSaleController()
const deleteProductSaleController = new DeleteProductSaleController()

productSalesRoutes.post('/', createProductSaleController.handle)
productSalesRoutes.put('/:id', updateProductSaleController.handle)
productSalesRoutes.delete('/:id/:productId', deleteProductSaleController.handle)

export { productSalesRoutes }
