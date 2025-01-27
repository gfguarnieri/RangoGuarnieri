import { ICreateRestaurantDTO } from '@domain/restaurant/dtos/ICreateRestaurantDTO'
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
  }: ICreateRestaurantDTO) {
    const item = new Restaurant({
      name,
      image,
      address,
      city,
      country,
      number,
      postalCode,
      state,
    })
    this.restaurants.push(item)
    return item
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
    }: ICreateRestaurantDTO,
  ) {
    const itemIndex = this.restaurants.findIndex(
      (restaurant) => restaurant.id === id,
    )

    if (itemIndex < 0) return undefined

    Object.assign(this.restaurants[itemIndex], {
      name,
      image,
      address,
      city,
      country,
      number,
      postalCode,
      state,
    })

    return this.restaurants[itemIndex]
  }

  async findById(id: string) {
    return this.restaurants.find((restaurant) => restaurant.id === id)
  }

  async list(): Promise<Restaurant[]> {
    return this.restaurants
  }
}
