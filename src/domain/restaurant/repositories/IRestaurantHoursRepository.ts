import { ICreateRestaurantHoursDTO } from '../dtos/ICreateRestaurantHoursDTO'
import { IUpdateRestaurantHoursDTO } from '../dtos/IUpdateRestaurantHoursDTO'
import { RestaurantHours } from '../entities/RestaurantHours'

export interface IRestaurantHoursRepository {
  create(
    hours: ICreateRestaurantHoursDTO,
    id?: string,
  ): Promise<ICreateRestaurantHoursDTO>
  update(
    id: string,
    hours: IUpdateRestaurantHoursDTO,
  ): Promise<IUpdateRestaurantHoursDTO | undefined>
  findById(id: string): Promise<RestaurantHours | undefined>
  listByRestaurantId(restaurantId: string): Promise<RestaurantHours[]>
  delete(id: string): Promise<void>
}
