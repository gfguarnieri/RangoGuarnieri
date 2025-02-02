import { randomUUID } from 'crypto'
import { ICategory } from '../models/ICategory'

export class Category {
  id?: string
  name: string
  restaurantId: string
  createdAt?: Date
  updatedAt?: Date
  constructor(props: ICategory, id?: string) {
    this.id = id ?? randomUUID()
    this.name = props.name
    this.restaurantId = props.restaurantId
    this.createdAt = props.createdAt
    this.updatedAt = props.updatedAt
  }
}
