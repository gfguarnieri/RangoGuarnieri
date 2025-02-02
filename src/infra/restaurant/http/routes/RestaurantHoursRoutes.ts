import { Router } from 'express'
import { ListRestauranthoursController } from '../controllers/restaurantHours/ListRestaurantHoursController'
import { UpdateAllRestaurantHoursController } from '../controllers/restaurantHours/UpdateAllRestaurantHoursController'

const restaurantsHoursRoutes = Router()

const listRestauranthoursController = new ListRestauranthoursController()
const updateAllRestaurantHoursController =
  new UpdateAllRestaurantHoursController()

restaurantsHoursRoutes.get('/:id', listRestauranthoursController.handle)
restaurantsHoursRoutes.put('/:id', updateAllRestaurantHoursController.handle)

export { restaurantsHoursRoutes }
