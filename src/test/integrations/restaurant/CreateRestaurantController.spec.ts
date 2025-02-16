import { describe, it, expect } from 'vitest'
import { testRequest } from '../setup'
import { StatusCodes } from 'http-status-codes'

describe('CreateRestaurantController', () => {
  it('should be able to create a new restaurant', async () => {
    const response = await testRequest.post('/restaurants').send({
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

    expect(response.status).toBe(StatusCodes.CREATED)
    expect(response.body).toHaveProperty('id')
    expect(response.body.name).toBe('Restaurant Test')
  })

  it('should not be able to create a restaurant with invalid data', async () => {
    const response = await testRequest.post('/restaurants').send({
      name: 'R',
      address: '',
      city: 'Test City',
      neighborhood: 'Test Neighborhood',
      number: '123',
      postalCode: '12345678',
      state: 'SPP',
    })

    expect(response.status).toBe(StatusCodes.BAD_REQUEST)
  })

  it('should validate restaurant hours format', async () => {
    const response = await testRequest.post('/restaurants').send({
      name: 'Restaurant Test',
      address: 'Test Address',
      city: 'Test City',
      neighborhood: 'Test Neighborhood',
      number: '123',
      postalCode: '12345678',
      state: 'SP',
      restaurantHours: [
        {
          openingTime: '25:00',
          closingTime: '18:00',
          dayOfWeek: 'INVALID_DAY',
        },
      ],
    })

    expect(response.status).toBe(StatusCodes.BAD_REQUEST)
  })
})
