import { randomUUID } from 'crypto'
import { IProduct } from '../models/IProduct'
import { ProductSale } from './ProductSale'

export class Product {
  id?: string
  restaurantId: string
  categoryId: string
  productSale?: ProductSale
  name: string
  description?: string
  price: number
  currentPrice?: number
  image?: string
  createdAt?: Date
  updatedAt?: Date

  constructor(props: IProduct, id?: string) {
    this.id = id ?? randomUUID()
    this.restaurantId = props.restaurantId
    this.name = props.name
    this.description = props.description
    this.price = props.price
    this.currentPrice = props.currentPrice
    this.image = props.image
    this.categoryId = props.categoryId
    this.createdAt = props.createdAt
    this.updatedAt = props.updatedAt
    this.productSale = props.productSale
  }
}
