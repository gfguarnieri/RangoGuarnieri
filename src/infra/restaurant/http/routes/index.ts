import { Router } from 'express'
import { restaurantsRoutes } from './RestaurantRoutes'

const router = Router()

router.use('/restaurants', restaurantsRoutes)

export { router }
