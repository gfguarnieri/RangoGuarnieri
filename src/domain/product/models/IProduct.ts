import { ICategory } from './ICategory'
import { IProductSale } from './IProductSale'

export const ProductBucket = 'products'

export interface IProduct {
  id?: string
  restaurantId: string
  categoryId: string
  category?: ICategory
  productSale?: IProductSale
  name: string
  description?: string
  price: number
  currentPrice?: number
  image?: string
  createdAt?: Date
  updatedAt?: Date
}
