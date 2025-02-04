import { ICreateCategoryDTO } from 'domain/product/dtos/ICreateCategoryDTO'
import { IUpdateCategoryDTO } from 'domain/product/dtos/IUpdateCategoryDTO'
import { ICategory } from 'domain/product/models/ICategory'
import { ICategoryRepository } from 'domain/product/repositories/ICategoryRepository'
import { RangoDataSource } from 'shared/infra/typeorm/connection'
import { z } from '@zod/i18n'
import { RepositoryError } from 'shared/errors/RepositoryError'
import { Category } from 'domain/product/entities/Category'

export class CategoryRepository implements ICategoryRepository {
  async create(category: ICreateCategoryDTO): Promise<ICategory> {
    const query = await RangoDataSource.query(
      `INSERT INTO category 
              (name, restaurant_id) 
              VALUES ($1, $2) RETURNING id`,
      [category.name, category.restaurantId],
    )
    const resultSchema = z.array(
      z.object({
        id: z.string(),
      }),
    )

    const result = resultSchema.safeParse(query)

    if (!result.success) {
      throw new RepositoryError('Error creating category')
    }

    const [row] = result.data

    const restaurantCreated = new Category(category, row.id)

    return restaurantCreated
  }

  async list(): Promise<ICategory[]> {
    const categories = (await RangoDataSource.query(`SELECT 
        id,
        name,
        restaurant_id as "restaurantId", 
        created_at as "createdAt",
        updated_at as "updatedAt"
        FROM category
        ORDER BY name
        `)) as ICategory[]

    return categories
  }

  async findById(id: string): Promise<ICategory | undefined> {
    const rows = await RangoDataSource.query(
      `SELECT 
        id,
        name,
        restaurant_id as "restaurantId", 
        created_at as "createdAt",
        updated_at as "updatedAt"
        FROM category
        WHERE id = $1`,
      [id],
    )

    if (rows.length === 0) {
      return undefined
    }
    return rows[0] as ICategory
  }

  async listByRestaurantId(restaurantId: string): Promise<ICategory[]> {
    const rows = (await RangoDataSource.query(
      `SELECT 
        id,
        name,
        restaurant_id as "restaurantId", 
        created_at as "createdAt",
        updated_at as "updatedAt"
        FROM category
        WHERE restaurant_id = $1
        ORDER BY name
        `,
      [restaurantId],
    )) as ICategory[]

    return rows
  }

  async update(
    id: string,
    data: IUpdateCategoryDTO,
  ): Promise<ICategory | undefined> {
    const query = await RangoDataSource.query(
      `UPDATE category 
        SET name = $1, updated_at = NOW()
        WHERE id = $2
        RETURNING id`,
      [data.name, id],
    )

    const rowsAffected = query[1]

    if (rowsAffected === 0) {
      throw new RepositoryError('Category not found')
    }

    const categoryUpdated = new Category(data, id)
    return categoryUpdated
  }

  async delete(id: string): Promise<void> {
    const query = await RangoDataSource.query(
      `DELETE FROM category WHERE id = $1`,
      [id],
    )
    const rowsAffected = query[1]
    if (rowsAffected === 0) {
      throw new RepositoryError('Category not found')
    }
  }
}
