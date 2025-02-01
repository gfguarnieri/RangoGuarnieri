import { randomUUID } from 'crypto'
import { DayOfWeek, IRestaurantHours } from '../models/IRestaurantHours'

export class RestaurantHours {
  id?: string
  restaurantId?: string
  dayOfWeek: DayOfWeek
  openingTime: string
  closingTime: string
  createdAt?: Date

  constructor(props: IRestaurantHours, id?: string) {
    this.id = id ?? randomUUID()
    this.restaurantId = props.restaurantId
    this.dayOfWeek = props.dayOfWeek
    this.openingTime = props.openingTime
    this.closingTime = props.closingTime
    this.createdAt = props.createdAt
  }
}
