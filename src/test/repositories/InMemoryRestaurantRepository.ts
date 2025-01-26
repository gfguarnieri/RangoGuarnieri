import { ICreateRestaurantDTO } from '@domain/restaurant/dtos/ICreateRestaurantDTO'
import { IUpdateRestaurantDTO } from '@domain/restaurant/dtos/IUpdateRestaurantDTO'
import { Restaurant } from '@domain/restaurant/entities/Restaurant'
import { IRestaurantRepository } from '@domain/restaurant/repositories/IRestaurantRepository'

export class InMemoryRestaurantRepository implements IRestaurantRepository {
  private restaurants: Restaurant[] = []

  async create({ name, image }: ICreateRestaurantDTO) {
    const restaurant = Restaurant.create({ name, image })
    this.restaurants.push(restaurant)
    return restaurant
  }

  async update(id: string, { name, image }: IUpdateRestaurantDTO) {
    const itemIndex = this.restaurants.findIndex(
      (restaurant) => restaurant.id.toString() === id,
    )

    if (itemIndex < 0) return undefined

    const restaurant = Restaurant.update(this.restaurants[itemIndex], {
      name,
      image,
    })

    return restaurant
  }

  async findById(id: string) {
    return this.restaurants.find(
      (restaurant) => restaurant.id.toString() === id,
    )
  }

  async list(): Promise<Restaurant[]> {
    return this.restaurants
  }
}
