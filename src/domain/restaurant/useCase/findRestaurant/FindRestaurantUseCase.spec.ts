import 'reflect-metadata'
import { FindRestaurantUseCase } from './FindRestaurantUseCase'
import { InMemoryRestaurantRepository } from 'test/repositories/InMemoryRestaurantRepository'
import { ICreateRestaurantDTO } from '@domain/restaurant/dtos/ICreateRestaurantDTO'
import { UseCaseValidationError } from '@core/errors/UseCaseValidationError'
import { describe, it, expect, beforeAll } from 'vitest'

let restaurantRepository: InMemoryRestaurantRepository
let findRestaurantUseCase: FindRestaurantUseCase

describe('FindRestaurantUseCase', async () => {
  beforeAll(async () => {
    restaurantRepository = new InMemoryRestaurantRepository()
    findRestaurantUseCase = new FindRestaurantUseCase(restaurantRepository)
  })

  it('should find a restaurant by id', async () => {
    const restaurantData: ICreateRestaurantDTO = {
      name: 'Restaurante Guarnieri',
      image: 'guarnieri-logo',
    }

    const createdRestaurant = await restaurantRepository.create(restaurantData)

    const foundRestaurant = await findRestaurantUseCase.execute(
      createdRestaurant.id.toString(),
    )

    expect(foundRestaurant).toHaveProperty('id')
    expect(foundRestaurant.name).toBe(restaurantData.name)
    expect(foundRestaurant.image).toBe(restaurantData.image)
  })

  it('should throw an error if restaurant does not exist', async () => {
    await expect(
      findRestaurantUseCase.execute('non-existent-id'),
    ).rejects.toThrowError(UseCaseValidationError)
  })
})
