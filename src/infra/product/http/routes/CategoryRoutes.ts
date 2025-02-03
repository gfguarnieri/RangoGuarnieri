import { Router } from 'express'
import { CreateCategoryController } from '../controllers/CreateCategoryController'
import { UpdateCategoryController } from '../controllers/UpdateCategoryController'

const categoriesRoutes = Router()

const createCategoryController = new CreateCategoryController()
const updateCategoryController = new UpdateCategoryController()

categoriesRoutes.post('/', createCategoryController.handle)
categoriesRoutes.put('/:id', updateCategoryController.handle)

export { categoriesRoutes }
