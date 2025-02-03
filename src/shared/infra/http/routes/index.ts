import { restaurantsRoutes } from 'infra/restaurant/http/routes/RestaurantRoutes'
import { Router } from 'express'
import { restaurantsHoursRoutes } from 'infra/restaurant/http/routes/RestaurantHoursRoutes'
import { categoriesRoutes } from 'infra/product/http/routes/CategoryRoutes'

const router = Router()

router.use('/restaurants', restaurantsRoutes)
router.use('/restaurant-hours', restaurantsHoursRoutes)
router.use('/categories', categoriesRoutes)

export { router }
