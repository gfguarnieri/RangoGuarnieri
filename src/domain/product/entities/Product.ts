import { randomUUID } from 'crypto'
import { IProduct } from '../models/IProduct'

export class Product {
  id?: string
  restaurantId: string
  categoryId: string
  name: string
  description: string
  price: number
  image?: string
  createdAt?: Date
  updatedAt?: Date

  constructor(props: IProduct, id?: string) {
    this.id = id ?? randomUUID()
    this.restaurantId = props.restaurantId
    this.name = props.name
    this.description = props.description
    this.price = props.price
    this.image = props.image
    this.categoryId = props.categoryId
    this.createdAt = props.createdAt
    this.updatedAt = props.updatedAt
  }
}
