import { restaurantsRoutes } from 'infra/restaurant/http/routes/RestaurantRoutes'
import { Router } from 'express'

const router = Router()

router.use('/restaurants', restaurantsRoutes)

export { router }
