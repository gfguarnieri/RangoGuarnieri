import { RestaurantHours } from '@domain/restaurant/entities/RestaurantHours'
import { IRestaurantHours } from '@domain/restaurant/models/IRestaurantHours'
import { IRestaurantHoursRepository } from '@domain/restaurant/repositories/IRestaurantHoursRepository'

export class InMemoryRestaurantHoursRepository
  implements IRestaurantHoursRepository
{
  private hours: IRestaurantHours[] = []

  async create(hours: IRestaurantHours, id?: string): Promise<RestaurantHours> {
    const restaurantHours = new RestaurantHours(hours, id)
    this.hours.push(restaurantHours)
    return restaurantHours
  }

  async update(
    id: string,
    hours: IRestaurantHours,
  ): Promise<RestaurantHours | undefined> {
    const index = this.hours.findIndex((h) => h.id === id)
    if (index < 0) return undefined
    this.hours[index] = hours
    return hours
  }

  async findById(id: string): Promise<RestaurantHours | undefined> {
    return this.hours.find((h) => h.id === id)
  }

  async listByRestaurantId(restaurantId: string): Promise<RestaurantHours[]> {
    return this.hours.filter((h) => h.restaurantId === restaurantId)
  }

  async delete(id: string): Promise<void> {
    this.hours = this.hours.filter((h) => h.id !== id)
  }
}
