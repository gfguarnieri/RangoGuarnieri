import { ICreateRestaurantRequest } from '@domain/restaurant/dtos/ICreateRestaurantRequest'
import { IUpdateRestaurantRequest } from '@domain/restaurant/dtos/IUpdateRestaurantRequest'
import { Restaurant } from '@domain/restaurant/entities/Restaurant'
import { IRestaurantRepository } from '@domain/restaurant/repositories/IRestaurantRepository'

export class InMemoryRestaurantRepository implements IRestaurantRepository {
  private restaurants: Restaurant[] = []

  async create({
    name,
    image,
    address,
    city,
    country,
    number,
    postalCode,
    state,
  }: ICreateRestaurantRequest) {
    const restaurant = Restaurant.create({
      name,
      image,
      address,
      city,
      country,
      number,
      postalCode,
      state,
    })
    this.restaurants.push(restaurant)
    return restaurant
  }

  async update(
    id: string,
    {
      name,
      image,
      address,
      city,
      country,
      number,
      postalCode,
      state,
    }: IUpdateRestaurantRequest,
  ) {
    const itemIndex = this.restaurants.findIndex(
      (restaurant) => restaurant.id.toString() === id,
    )

    if (itemIndex < 0) return undefined

    const restaurant = Restaurant.update(this.restaurants[itemIndex], {
      name,
      image,
      address,
      city,
      country,
      number,
      postalCode,
      state,
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
