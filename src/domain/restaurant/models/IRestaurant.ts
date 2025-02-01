import { IRestaurantHours } from './IRestaurantHours'

export interface IRestaurant {
  id?: string
  name: string
  image: string
  state: string
  city: string
  postalCode: string
  neighborhood: string
  address: string
  number: string
  restaurantHours?: IRestaurantHours[]
}
