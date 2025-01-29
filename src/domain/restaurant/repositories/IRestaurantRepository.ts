import { ICreateRestaurantDTO } from '../dtos/ICreateRestaurantDTO'
import { IUpdateRestaurantDTO } from '../dtos/IUpdateRestaurantDTO'
import { Restaurant } from '../entities/Restaurant'

export interface IRestaurantRepository {
  create(restaurant: ICreateRestaurantDTO): Promise<Restaurant>
  update(
    id: string,
    restaurant: IUpdateRestaurantDTO,
  ): Promise<Restaurant | undefined>
  findById(id: string): Promise<Restaurant | undefined>
  list(): Promise<Restaurant[]>
  delete(id: string): Promise<void>
}
