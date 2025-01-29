import { Router } from 'express'
import { CreateRestaurantController } from '../controllers/CreateRestaurantController'
import { UpdateRestaurantController } from '../controllers/UpdateRestaurantController'
import { ListRestaurantController } from '../controllers/ListRestaurantController'
import { DeleteRestaurantController } from '../controllers/DeleteRestaurantController'

const restaurantsRoutes = Router()

const createRestaurantController = new CreateRestaurantController()
const updateRestaurantController = new UpdateRestaurantController()
const listRestaurantController = new ListRestaurantController()
const deleteRestaurantController = new DeleteRestaurantController()

restaurantsRoutes.post('/', createRestaurantController.handle)
restaurantsRoutes.put('/:id', updateRestaurantController.handle)
restaurantsRoutes.get('/:id', createRestaurantController.handle)
restaurantsRoutes.get('/', listRestaurantController.handle)
restaurantsRoutes.delete('/:id', deleteRestaurantController.handle)

export { restaurantsRoutes }
