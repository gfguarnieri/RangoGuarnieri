import { Router } from 'express'
import { CreateCategoryController } from '../controllers/category/CreateCategoryController'
import { UpdateCategoryController } from '../controllers/category/UpdateCategoryController'
import { DeleteCategoryController } from '../controllers/category/DeleteCategoryController'
import { ListCategoryController } from '../controllers/category/ListCategoryController'
import { ListCategoryByRestaurantController } from '../controllers/category/ListCategoryByRestaurantController'
import { FindCategoryController } from '../controllers/category/FindCategoryController'

const categoriesRoutes = Router()

const listCategoryController = new ListCategoryController()
const listCategoryByRestaurantController =
  new ListCategoryByRestaurantController()
const createCategoryController = new CreateCategoryController()
const updateCategoryController = new UpdateCategoryController()
const deleteCategoryController = new DeleteCategoryController()
const findCategoryController = new FindCategoryController()

categoriesRoutes.get('/', listCategoryController.handle)
categoriesRoutes.get('/:id', findCategoryController.handle)
categoriesRoutes.get(
  '/restaurant/:restaurantId',
  listCategoryByRestaurantController.handle,
)
categoriesRoutes.post('/', createCategoryController.handle)
categoriesRoutes.put('/:id', updateCategoryController.handle)
categoriesRoutes.delete('/:id', deleteCategoryController.handle)

export { categoriesRoutes }
