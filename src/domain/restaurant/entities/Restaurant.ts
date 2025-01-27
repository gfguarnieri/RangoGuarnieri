import { randomUUID } from 'crypto'
import { IRestaurant } from '../models/IRestaurant'

export class Restaurant {
  id?: string
  name: string
  image: string
  address?: string
  number?: string
  city?: string
  state?: string
  country?: string
  postalCode?: string

  constructor(props: IRestaurant, id?: string) {
    this.id = id ?? randomUUID()
    this.name = props.name
    this.image = props.image
    this.address = props.address
    this.number = props.number
    this.city = props.city
    this.state = props.state
    this.country = props.country
    this.postalCode = props.postalCode
  }
}
