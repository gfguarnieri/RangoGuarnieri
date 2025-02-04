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
  ): Promise<Omit<Restaurant, 'image'> | undefined> {
    const query = await RangoDataSource.query(
      `UPDATE restaurant 
            SET name = $1, address = $2, city = $3, 
            neighborhood = $4, number = $5, postalCode = $6, state = $7, updated_at = NOW() 
            WHERE id = $8`,
      [
        restaurant.name,
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
          r.id,
          r.image,
          r.name, 
          r.address,
          r.neighborhood,
          r.number,
          r.city,
          r.state,
          r.postalCode as "postalCode",
          r.created_at as "createdAt",
          r.updated_at as "updatedAt",
          COALESCE(jsonb_agg(
              jsonb_build_object(
                  'id', rh.id,
                  'dayOfWeek', rh.day_of_week,
                  'openingTime', rh.opening_time,
                  'closingTime', rh.closing_time,
                  'createdAt', rh.created_at
              )
          ) FILTER (WHERE rh.id IS NOT NULL), '[]'::jsonb) as "restaurantHours"
      FROM restaurant r
          LEFT JOIN restaurant_hours rh ON rh.restaurant_id = r.id
      WHERE r.id = $1
      GROUP BY r.id
      ORDER BY r.name
      `,
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
        image,
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

  async updateImage(
    id: string,
    image: string,
  ): Promise<Pick<Restaurant, 'id' | 'image'>> {
    const query = await RangoDataSource.query(
      `UPDATE restaurant SET image = $1 WHERE id = $2`,
      [image, id],
    )

    const rowsAffected = query[1]

    if (rowsAffected === 0) {
      throw new RepositoryError('Restaurant not found')
    }

    return { id, image }
  }
}
