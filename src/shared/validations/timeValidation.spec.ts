import { describe, it, expect } from 'vitest'
import {
  validateAllHours,
  validateHour,
  validateIntervalHour,
  validationOpeningAndClosingTime,
} from './timeValidation'
import { UseCaseValidationError } from 'shared/errors/UseCaseValidationError'
import { DayOfWeek } from '@domain/restaurant/models/IRestaurantHours'

describe('timeValidation', async () => {
  it('should validate correctly when opening and closing times are valid', () => {
    expect(() =>
      validateHour({
        openingTime: '09:00',
        closingTime: '10:00',
        dayOfWeek: DayOfWeek.FRIDAY,
      }),
    ).not.toThrow()
  })

  it('should throw an error when the interval is less than 15 minutes', () => {
    const hour = {
      openingTime: '09:00',
      closingTime: '09:10',
      dayOfWeek: DayOfWeek.FRIDAY,
    }
    expect(() => validateHour(hour)).toThrow(UseCaseValidationError)
  })

  it('should throw an error when closing time is less than opening time', () => {
    const hour = {
      openingTime: '10:00',
      closingTime: '09:00',
      dayOfWeek: DayOfWeek.FRIDAY,
    }
    expect(() => validateHour(hour)).toThrow(UseCaseValidationError)
  })

  it('should validate correctly when interval is 15 minutes or more', () => {
    const openingTime = new Date('2025-01-01T09:00:00.000Z')
    const closingTime = new Date('2025-01-01T09:15:00.000Z')
    expect(() => validateIntervalHour(openingTime, closingTime)).not.toThrow()
  })

  it('should throw an error when interval is less than 15 minutes', () => {
    const openingTime = new Date('2025-01-01T09:00:00.000Z')
    const closingTime = new Date('2025-01-01T09:10:00.000Z')
    expect(() => validateIntervalHour(openingTime, closingTime)).toThrow(
      UseCaseValidationError,
    )
  })

  it('should validate correctly when closing time is greater than opening time', () => {
    const openingTime = '09:00'
    const closingTime = '10:00'
    expect(() =>
      validationOpeningAndClosingTime(openingTime, closingTime),
    ).not.toThrow()
  })

  it('should throw an error when closing time is less than or equal to opening time', () => {
    const openingTime = '10:00'
    const closingTime = '09:00'
    expect(() =>
      validationOpeningAndClosingTime(openingTime, closingTime),
    ).toThrow(UseCaseValidationError)
  })

  it('should throw an error when closing time is equal to opening time', () => {
    const openingTime = '10:00'
    const closingTime = '10:00'
    expect(() =>
      validationOpeningAndClosingTime(openingTime, closingTime),
    ).toThrow(UseCaseValidationError)
  })

  it('abacate', () => {
    const hour1 = {
      openingTime: '09:00',
      closingTime: '10:00',
      dayOfWeek: DayOfWeek.FRIDAY,
    }
    const hour2 = {
      openingTime: '09:30',
      closingTime: '10:30',
      dayOfWeek: DayOfWeek.FRIDAY,
    }

    expect(() => validateAllHours([hour1, hour2])).toThrow(
      new UseCaseValidationError(
        `Overlapping hours detected for day ${hour1.dayOfWeek}`,
      ),
    )
  })
})
