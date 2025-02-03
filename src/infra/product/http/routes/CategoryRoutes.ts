import { Router } from 'express'
import { CreateCategoryController } from '../controllers/CreateCategoryController'
import { UpdateCategoryController } from '../controllers/UpdateCategoryController'
import { DeleteCategoryController } from '../controllers/DeleteCategoryController'

const categoriesRoutes = Router()

const createCategoryController = new CreateCategoryController()
const updateCategoryController = new UpdateCategoryController()
const deleteCategoryController = new DeleteCategoryController()

categoriesRoutes.post('/', createCategoryController.handle)
categoriesRoutes.put('/:id', updateCategoryController.handle)
categoriesRoutes.delete('/:id', deleteCategoryController.handle)

export { categoriesRoutes }
