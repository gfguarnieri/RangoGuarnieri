import { ICategory } from '../models/ICategory'

export interface ICreateCategoryDTO extends Omit<ICategory, 'id'> {}
