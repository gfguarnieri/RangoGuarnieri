import { IRestaurantHours } from '../models/IRestaurantHours'

export interface IRestaurantHoursRepository {
  create(hours: IRestaurantHours): Promise<IRestaurantHours>
  update(
    id: string,
    hours: IRestaurantHours,
  ): Promise<IRestaurantHours | undefined>
  findById(id: string): Promise<IRestaurantHours | undefined>
  listByRestaurantId(restaurantId: string): Promise<IRestaurantHours[]>
  delete(id: string): Promise<void>
}
