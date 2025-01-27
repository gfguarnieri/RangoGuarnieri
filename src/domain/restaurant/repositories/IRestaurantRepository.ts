import {
  Restaurant,
  RestaurantProps,
} from '@domain/restaurant/entities/Restaurant'

interface ICreateRestaurantRequest extends RestaurantProps {
  id?: string
}

interface ICreateRestaurantResponse extends RestaurantProps {
  id: string
}

export interface IRestaurantRepository {
  create(
    restaurant: ICreateRestaurantRequest,
  ): Promise<ICreateRestaurantResponse>
  update(
    id: string,
    restaurant: ICreateRestaurantRequest,
  ): Promise<Restaurant | undefined>
  findById(id: string): Promise<Restaurant | undefined>
  list(): Promise<Restaurant[]>
}
