import { IRestaurant } from '../models/IRestaurant'

export interface ICreateRestaurantDTO extends Omit<IRestaurant, 'id'> {}
