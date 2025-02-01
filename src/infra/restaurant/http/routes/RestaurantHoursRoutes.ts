import { Router } from 'express'
import { ListRestauranthoursController } from '../controllers/restaurantHours/ListRestaurantHoursController'

const restaurantsHoursRoutes = Router()

const listRestauranthoursController = new ListRestauranthoursController()

restaurantsHoursRoutes.get('/:id', listRestauranthoursController.handle)

export { restaurantsHoursRoutes }
