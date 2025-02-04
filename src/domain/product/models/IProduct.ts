import { ICategory } from './ICategory'

export const ProductBucket = 'products'

export interface IProduct {
  id?: string
  restaurantId: string
  categoryId: string
  category?: ICategory
  name: string
  description?: string
  price: number
  image?: string
  createdAt?: Date
  updatedAt?: Date
}
