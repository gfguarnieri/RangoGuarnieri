import { Router } from 'express'
import { restaurantsRoutes } from 'infra/restaurant/http/routes/RestaurantRoutes'
import { restaurantsHoursRoutes } from 'infra/restaurant/http/routes/RestaurantHoursRoutes'
import { categoriesRoutes } from 'infra/product/http/routes/CategoryRoutes'
import { productsRoutes } from 'infra/product/http/routes/ProductRoutes'
import { productSalesRoutes } from 'infra/product/http/routes/ProductSaleRoutes'

const router = Router()

router.use('/restaurants', restaurantsRoutes)
router.use('/restaurant-hours', restaurantsHoursRoutes)

router.use('/categories', categoriesRoutes)
router.use('/products', productsRoutes)
router.use('/product-sales', productSalesRoutes)

export { router }
