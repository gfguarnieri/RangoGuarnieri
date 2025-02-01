import { restaurantsRoutes } from 'infra/restaurant/http/routes/RestaurantRoutes'
import { Router } from 'express'
import { restaurantsHoursRoutes } from 'infra/restaurant/http/routes/RestaurantHoursRoutes'

const router = Router()

router.use('/restaurants', restaurantsRoutes)
router.use('/restaurant-hours', restaurantsHoursRoutes)

export { router }
