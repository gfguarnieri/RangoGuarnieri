import { IHours } from 'domain/core/models/IHours'

export interface IRestaurantHours extends IHours {
  restaurantId?: string
}
