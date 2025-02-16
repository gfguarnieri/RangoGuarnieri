import { describe, it, expect, beforeAll } from 'vitest'
import { testRequest } from '../setup'
import { StatusCodes } from 'http-status-codes'
import { resolve } from 'path'

describe('CreateProductSaleController', () => {
  let productId: string

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
    const restaurantId = restaurantResponse.body.id

    const categoryResponse = await testRequest.post('/categories').send({
      name: 'Test Category',
      restaurantId,
    })
    const categoryId = categoryResponse.body.id

    const testImagePath = resolve(__dirname, '..', 'images', 'test-image.jpg')
    const productResponse = await testRequest
      .post('/products')
      .field('name', 'Product Test')
      .field('description', 'Test Description')
      .field('price', '10.50')
      .field('restaurantId', restaurantId)
      .field('categoryId', categoryId)
      .attach('image', testImagePath)

    productId = productResponse.body.id
  })

  it('should be able to create a new product sale', async () => {
    const response = await testRequest.post('/product-sales').send({
      productId,
      promotionPrice: 8.5,
      description: 'Sale Test',
      active: true,
      productSaleDay: [
        {
          openingTime: '08:00',
          closingTime: '18:00',
          dayOfWeek: 'MONDAY',
        },
      ],
    })

    expect(response.status).toBe(StatusCodes.CREATED)
    expect(response.body).toHaveProperty('id')
    expect(response.body.promotionPrice).toBe(8.5)
    expect(response.body.productId).toBe(productId)
  })

  it('should not be able to create a product sale with invalid data', async () => {
    const response = await testRequest.post('/product-sales').send({
      productId,
      promotionPrice: -1,
      description: '',
      active: true,
      productSaleDay: [
        {
          openingTime: '25:00',
          closingTime: '18:00',
          dayOfWeek: 'INVALID_DAY',
        },
      ],
    })

    expect(response.status).toBe(StatusCodes.BAD_REQUEST)
  })

  it('should not be able to create a product sale with non-existent product', async () => {
    const response = await testRequest.post('/product-sales').send({
      productId: '00000000-0000-0000-0000-000000000000',
      promotionPrice: 8.5,
      description: 'Sale Test',
      active: true,
      productSaleDay: [
        {
          openingTime: '08:00',
          closingTime: '18:00',
          dayOfWeek: 'MONDAY',
        },
      ],
    })

    expect(response.status).toBe(StatusCodes.NOT_FOUND)
  })

  it('should validate promotion price is less than product price', async () => {
    const response = await testRequest.post('/product-sales').send({
      productId,
      promotionPrice: 15.5,
      description: 'Sale Test',
      active: true,
      productSaleDay: [
        {
          openingTime: '08:00',
          closingTime: '18:00',
          dayOfWeek: 'MONDAY',
        },
      ],
    })

    expect(response.status).toBe(StatusCodes.BAD_REQUEST)
  })
})
