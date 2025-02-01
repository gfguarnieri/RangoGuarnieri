import { Router } from 'express'
import { CreateRestaurantController } from '../controllers/restaurant/CreateRestaurantController'
import { UpdateRestaurantController } from '../controllers/restaurant/UpdateRestaurantController'
import { ListRestaurantController } from '../controllers/restaurant/ListRestaurantController'
import { DeleteRestaurantController } from '../controllers/restaurant/DeleteRestaurantController'
import { FindRestaurantController } from '../controllers/restaurant/FindRestaurantController'

const restaurantsRoutes = Router()

const createRestaurantController = new CreateRestaurantController()
const updateRestaurantController = new UpdateRestaurantController()
const listRestaurantController = new ListRestaurantController()
const deleteRestaurantController = new DeleteRestaurantController()
const findRestaurantController = new FindRestaurantController()

restaurantsRoutes.post('/', createRestaurantController.handle)
restaurantsRoutes.put('/:id', updateRestaurantController.handle)
restaurantsRoutes.get('/:id', findRestaurantController.handle)
restaurantsRoutes.get('/', listRestaurantController.handle)
restaurantsRoutes.delete('/:id', deleteRestaurantController.handle)

export { restaurantsRoutes }
