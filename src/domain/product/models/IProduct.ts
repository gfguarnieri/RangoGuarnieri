import { ICategory } from './ICategory'

export interface Product {
  id?: string
  restaurant_id: string
  name: string
  description: string
  price: number
  image?: string
  category_id?: string
  category?: ICategory
  createdAt?: Date
  updatedAt?: Date
}
