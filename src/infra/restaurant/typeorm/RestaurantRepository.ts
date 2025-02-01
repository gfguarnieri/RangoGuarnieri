import { z } from 'zod'
import { ICreateRestaurantDTO } from '@domain/restaurant/dtos/ICreateRestaurantDTO'
import { IUpdateRestaurantDTO } from '@domain/restaurant/dtos/IUpdateRestaurantDTO'
import { Restaurant } from '@domain/restaurant/entities/Restaurant'
import { IRestaurantRepository } from '@domain/restaurant/repositories/IRestaurantRepository'
import { RangoDataSource } from 'shared/infra/typeorm/connection'
import { RepositoryError } from 'shared/errors/RepositoryError'

export class RestaurantRepository implements IRestaurantRepository {
  async create(restaurant: ICreateRestaurantDTO): Promise<Restaurant> {
    const query = await RangoDataSource.query(
      `INSERT INTO restaurant 
            (name, image, address, city, neighborhood, number, postalCode, state) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id`,
      [
        restaurant.name,
        restaurant.image,
        restaurant.address,
        restaurant.city,
        restaurant.neighborhood,
        restaurant.number,
        restaurant.postalCode,
        restaurant.state,
      ],
    )
    const resultSchema = z.array(
      z.object({
        id: z.string(),
      }),
    )

    const result = resultSchema.safeParse(query)

    if (!result.success) {
      throw new RepositoryError('Error creating restaurant')
    }

    const [row] = result.data

    const restaurantCreated = new Restaurant(restaurant, row.id)

    return restaurantCreated
  }

  async update(
    id: string,
    restaurant: IUpdateRestaurantDTO,
  ): Promise<Restaurant | undefined> {
    const query = await RangoDataSource.query(
      `UPDATE restaurant 
            SET name = $1, image = $2, address = $3, city = $4, 
            neighborhood = $5, number = $6, postalCode = $7, state = $8, updated_at = NOW() 
            WHERE id = $9`,
      [
        restaurant.name,
        restaurant.image,
        restaurant.address,
        restaurant.city,
        restaurant.neighborhood,
        restaurant.number,
        restaurant.postalCode,
        restaurant.state,
        id,
      ],
    )

    const rowsAffected = query[1]

    if (rowsAffected === 0) {
      throw new RepositoryError('Restaurant not found')
    }

    const restaurantUpdated = new Restaurant(restaurant, id)

    return restaurantUpdated
  }

  async findById(id: string): Promise<Restaurant | undefined> {
    const rows = (await RangoDataSource.query(
      `SELECT 
        id,
        name, 
        address,
        neighborhood,
        number,
        city,
        state,
        postalCode,
        created_at as "createdAt",
        updated_at as "updatedAt"
      FROM restaurant WHERE id = $1`,
      [id],
    )) as Restaurant[]

    if (rows.length === 0) {
      return undefined
    }
    return rows[0]
  }

  async list(): Promise<Restaurant[]> {
    const rows = await RangoDataSource.query(
      `SELECT 
        id,
        name, 
        address,
        neighborhood,
        number,
        city,
        state,
        postalCode,
        created_at as "createdAt",
        updated_at as "updatedAt"
      FROM restaurant`,
    )
    const restaurants = rows as Restaurant[]
    return restaurants
  }

  async delete(id: string): Promise<void> {
    const query = await RangoDataSource.query(
      `DELETE FROM restaurant WHERE id = $1`,
      [id],
    )
    const rowsAffected = query[1]
    if (rowsAffected === 0) {
      throw new RepositoryError('Restaurant not found')
    }
  }
}
