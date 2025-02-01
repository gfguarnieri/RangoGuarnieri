import { IRestaurantHours } from '../models/IRestaurantHours'

export interface ICreateRestaurantHoursDTO
  extends Omit<IRestaurantHours, 'id'> {}
