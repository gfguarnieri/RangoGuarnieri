import { Restaurant } from '@domain/restaurant/entities/Restaurant'

import { IUpdateRestaurantDTO } from '@domain/restaurant/dtos/IUpdateRestaurantDTO'
import { ICreateRestaurantDTO } from '@domain/restaurant/dtos/ICreateRestaurantDTO'

export interface IRestaurantRepository {
  create(restaurant: ICreateRestaurantDTO): Promise<Restaurant>
  update(
    id: string,
    restaurant: IUpdateRestaurantDTO,
  ): Promise<Restaurant | undefined>
  findById(id: string): Promise<Restaurant | undefined>
  list(): Promise<Restaurant[]>
}
