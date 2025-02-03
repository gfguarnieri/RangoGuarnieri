import { z } from 'zod'
import { ICreateRestaurantHoursDTO } from '@domain/restaurant/dtos/ICreateRestaurantHoursDTO'
import { IUpdateRestaurantHoursDTO } from '@domain/restaurant/dtos/IUpdateRestaurantHoursDTO'
import { RestaurantHours } from '@domain/restaurant/entities/RestaurantHours'
import { IRestaurantHoursRepository } from '@domain/restaurant/repositories/IRestaurantHoursRepository'
import { RangoDataSource } from 'shared/infra/typeorm/connection'
import { RepositoryError } from 'shared/errors/RepositoryError'
import { IRestaurantHours } from '@domain/restaurant/models/IRestaurantHours'

export class RestaurantHoursRepository implements IRestaurantHoursRepository {
  async create(hours: ICreateRestaurantHoursDTO): Promise<RestaurantHours> {
    const query = await RangoDataSource.query(
      `INSERT INTO restaurant_hours 
            (restaurant_id, day_of_week, opening_time, closing_time) 
            VALUES ($1, $2, $3, $4) RETURNING id`,
      [
        hours.restaurantId,
        hours.dayOfWeek,
        hours.openingTime,
        hours.closingTime,
      ],
    )
    const resultSchema = z.array(
      z.object({
        id: z.string(),
      }),
    )

    const result = resultSchema.safeParse(query)

    if (!result.success) {
      throw new RepositoryError('Error creating restaurant hours')
    }

    const [row] = result.data

    const hoursCreated = new RestaurantHours(hours, row.id)

    return hoursCreated
  }

  async update(
    id: string,
    hours: IUpdateRestaurantHoursDTO,
  ): Promise<RestaurantHours | undefined> {
    const query = await RangoDataSource.query(
      `UPDATE restaurant_hours 
            SET day_of_week = $1, opening_time = $2, closing_time = $3
            WHERE id = $4`,
      [hours.dayOfWeek, hours.openingTime, hours.closingTime, id],
    )

    const rowsAffected = query[1]

    if (rowsAffected === 0) {
      throw new RepositoryError('Restaurant hours not found')
    }

    const hoursUpdated = new RestaurantHours(hours, id)

    return hoursUpdated
  }

  async findById(id: string): Promise<RestaurantHours | undefined> {
    const rows = (await RangoDataSource.query(
      `SELECT
        id, 
        restaurant_id as "restaurantId",
        day_of_week as "dayOfWeek", 
        opening_time as "openingTime", 
        closing_time as "closingTime",
        created_at as "createdAt"
      FROM restaurant_hours WHERE id = $1`,
      [id],
    )) as RestaurantHours[]

    if (rows.length === 0) {
      return undefined
    }
    return rows[0]
  }

  async listByRestaurantId(restaurantId: string): Promise<IRestaurantHours[]> {
    const rows = (await RangoDataSource.query(
      `SELECT 
        id, 
        restaurant_id as "restaurantId",
        day_of_week as "dayOfWeek", 
        opening_time as "openingTime", 
        closing_time as "closingTime",
        created_at as "createdAt"
      FROM restaurant_hours WHERE restaurant_id = $1`,
      [restaurantId],
    )) as RestaurantHours[]

    return rows
  }

  async list(): Promise<RestaurantHours[]> {
    const rows = await RangoDataSource.query(
      `SELECT 
        id, 
        restaurant_id as "restaurantId",
        day_of_week as "dayOfWeek", 
        opening_time as "openingTime", 
        closing_time as "closingTime",
        created_at as "createdAt"
      FROM restaurant_hours`,
    )
    const hours = rows as RestaurantHours[]
    return hours
  }

  async delete(id: string): Promise<void> {
    return RangoDataSource.query(`DELETE FROM restaurant_hours WHERE id = $1`, [
      id,
    ])
  }
}
