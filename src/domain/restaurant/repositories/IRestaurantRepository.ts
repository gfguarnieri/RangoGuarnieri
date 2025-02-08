import { ICreateRestaurantDTO } from '../dtos/ICreateRestaurantDTO'
import { IUpdateRestaurantDTO } from '../dtos/IUpdateRestaurantDTO'
import { Restaurant } from '../entities/Restaurant'

export interface IRestaurantRepository {
  exists(id: string): Promise<boolean>
  create(restaurant: ICreateRestaurantDTO): Promise<Restaurant>
  update(
    id: string,
    restaurant: Omit<IUpdateRestaurantDTO, 'image'>,
  ): Promise<Restaurant | undefined>
  updateImage(
    id: string,
    image: string,
  ): Promise<Pick<Restaurant, 'id' | 'image'>>
  findById(id: string): Promise<Restaurant | undefined>
  list(): Promise<Restaurant[]>
  delete(id: string): Promise<void>
}
