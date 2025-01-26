import { Router } from 'express'
import { CreateRestaurantController } from '../controllers/CreateRestaurantController'

const restaurantsRoutes = Router()

const createRestaurantController = new CreateRestaurantController()

restaurantsRoutes.post('/', createRestaurantController.handle)

export { restaurantsRoutes }
