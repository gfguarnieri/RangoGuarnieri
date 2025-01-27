import { IRestaurantDTO } from './IRestaurantDTO'

export interface ICreateRestaurantRequest extends Omit<IRestaurantDTO, 'id'> {}
