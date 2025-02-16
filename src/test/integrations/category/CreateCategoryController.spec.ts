import { describe, it, expect, beforeAll } from 'vitest'
import { testRequest } from '../setup'
import { StatusCodes } from 'http-status-codes'

describe('CreateCategoryController', () => {
  let restaurantId: string

  beforeAll(async () => {
    const response = await testRequest.post('/restaurants').send({
      name: 'Restaurant Test',
      address: 'Test Address',
      city: 'Test City',
      neighborhood: 'Test Neighborhood',
      number: '123',
      postalCode: '12345678',
      state: 'SP',
    })
    restaurantId = response.body.id
  })

  it('should be able to create a new category', async () => {
    const response = await testRequest.post('/categories').send({
      name: 'Category Test',
      restaurantId,
    })

    expect(response.status).toBe(StatusCodes.CREATED)
    expect(response.body).toHaveProperty('id')
    expect(response.body.name).toBe('Category Test')
    expect(response.body.restaurantId).toBe(restaurantId)
  })

  it('should not be able to create a category with invalid data', async () => {
    const response = await testRequest.post('/categories').send({
      name: '',
      restaurantId,
    })

    expect(response.status).toBe(StatusCodes.BAD_REQUEST)
  })

  it('should not be able to create a category with non-existent restaurant', async () => {
    const response = await testRequest.post('/categories').send({
      name: 'Category Test',
      restaurantId: '00000000-0000-0000-0000-000000000000',
    })

    expect(response.status).toBe(StatusCodes.NOT_FOUND)
  })

  it('should not be able to create a category with name longer than 100 characters', async () => {
    const response = await testRequest.post('/categories').send({
      name: 'a'.repeat(101),
      restaurantId,
    })

    expect(response.status).toBe(StatusCodes.BAD_REQUEST)
  })
})
