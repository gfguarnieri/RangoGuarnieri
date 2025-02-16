import { describe, it, expect, beforeAll } from 'vitest'
import { testRequest } from '../setup'
import { StatusCodes } from 'http-status-codes'
import { resolve } from 'path'

describe('CreateProductController', () => {
  let restaurantId: string
  let categoryId: string

  beforeAll(async () => {
    const restaurantResponse = await testRequest.post('/restaurants').send({
      name: 'Restaurant Test',
      address: 'Test Address',
      city: 'Test City',
      neighborhood: 'Test Neighborhood',
      number: '123',
      postalCode: '12345678',
      state: 'SP',
      restaurantHours: [
        {
          openingTime: '08:00',
          closingTime: '18:00',
          dayOfWeek: 'MONDAY',
        },
      ],
    })
    restaurantId = restaurantResponse.body.id

    const categoryResponse = await testRequest.post('/categories').send({
      name: 'Test Category',
      restaurantId,
    })
    categoryId = categoryResponse.body.id
  })

  const testImagePath = resolve(__dirname, '..', 'images', 'test-image.jpg')

  it('should be able to create a new product', async () => {
    const response = await testRequest
      .post('/products')
      .field('name', 'Product Test')
      .field('description', 'Test Description')
      .field('price', '10.50')
      .field('restaurantId', restaurantId)
      .field('categoryId', categoryId)
      .attach('image', testImagePath)

    console.log(response.body)
    expect(response.status).toBe(StatusCodes.CREATED)
    expect(response.body).toHaveProperty('id')
    expect(response.body.name).toBe('Product Test')
    expect(response.body.price).toBe(10.5)
  })

  it('should not be able to create a product with invalid data', async () => {
    const response = await testRequest
      .post('/products')
      .field('name', '') // Invalid - empty
      .field('description', 'Test Description')
      .field('price', '-10.50')
      .field('restaurantId', restaurantId)
      .field('categoryId', categoryId)
      .attach('image', testImagePath)

    expect(response.status).toBe(StatusCodes.BAD_REQUEST)
  })

  it('should not be able to create a product with non-existent restaurant', async () => {
    const response = await testRequest
      .post('/products')
      .field('name', 'Product Test')
      .field('description', 'Test Description')
      .field('price', '10.50')
      .field('restaurantId', '00000000-0000-0000-0000-000000000000')
      .field('categoryId', categoryId)
      .attach('image', testImagePath)

    expect(response.status).toBe(StatusCodes.NOT_FOUND)
  })

  it('should not be able to create a product with non-existent category', async () => {
    const response = await testRequest
      .post('/products')
      .field('name', 'Product Test')
      .field('description', 'Test Description')
      .field('price', '10.50')
      .field('restaurantId', restaurantId)
      .field('categoryId', '00000000-0000-0000-0000-000000000000')
      .attach('image', testImagePath)

    expect(response.status).toBe(StatusCodes.NOT_FOUND)
  })
})
