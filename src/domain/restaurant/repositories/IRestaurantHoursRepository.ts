import { ICreateRestaurantHoursDTO } from '../dtos/ICreateRestaurantHoursDTO'
import { IUpdateRestaurantHoursDTO } from '../dtos/IUpdateRestaurantHoursDTO'
import { IRestaurantHours } from '../models/IRestaurantHours'

export interface IRestaurantHoursRepository {
  create(
    hours: ICreateRestaurantHoursDTO,
    id?: string,
  ): Promise<ICreateRestaurantHoursDTO>
  update(
    id: string,
    hours: IUpdateRestaurantHoursDTO,
  ): Promise<IUpdateRestaurantHoursDTO | undefined>
  findById(id: string): Promise<IRestaurantHours | undefined>
  listByRestaurantId(restaurantId: string): Promise<IRestaurantHours[]>
  delete(id: string): Promise<void>
}
