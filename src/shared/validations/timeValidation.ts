import { IHours } from 'domain/core/models/IHours'
import { UseCaseValidationError } from 'shared/errors/UseCaseValidationError'

export function timeToInt(timeStr: string): number {
  const [hours, minutes] = timeStr.split(':')
  return parseInt(hours.padStart(2, '0') + minutes.padStart(2, '0'))
}

export function getCurrentDayOfWeekAndHour() {
  const date = new Date()
  const days = [
    'SUNDAY',
    'MONDAY',
    'TUESDAY',
    'WEDNESDAY',
    'THURSDAY',
    'FRIDAY',
    'SATURDAY',
  ]

  const hours = date.getHours()
  const minutes = date.getMinutes()

  return {
    dayOfWeek: days[date.getDay()],
    hour: `${hours}:${minutes}`,
  }
}

export function validateAllHours(hours: IHours[]) {
  hours.forEach((hour, index) => {
    const openingParts = hour.openingTime.split(':')
    checkLimitHourMinute(openingParts[0], openingParts[1])
    const closingParts = hour.closingTime.split(':')
    checkLimitHourMinute(closingParts[0], closingParts[1])

    validateHour(hour)
    for (let i = index + 1; i < hours.length; i++) {
      if (hours[i].dayOfWeek === hour.dayOfWeek) {
        checkForOverlappingHours(hour, hours[i])
      }
    }
  })
}

function checkLimitHourMinute(hour: string, minute: string) {
  if (hour.length !== 2 || minute.length !== 2) {
    throw new UseCaseValidationError('Invalid opening time format')
  }
  if (Number(hour) > 23 || Number(minute) > 59) {
    throw new UseCaseValidationError('Invalid opening time format')
  }
}

function checkForOverlappingHours(hour1: IHours, hour2: IHours) {
  const openingTime1 = new Date(`2025-01-01T${hour1.openingTime}:00.000Z`)
  const closingTime1 = new Date(`2025-01-01T${hour1.closingTime}:00.000Z`)
  const openingTime2 = new Date(`2025-01-01T${hour2.openingTime}:00.000Z`)
  const closingTime2 = new Date(`2025-01-01T${hour2.closingTime}:00.000Z`)

  if (
    (openingTime1 < closingTime2 && openingTime1 >= openingTime2) ||
    (openingTime2 < closingTime1 && openingTime2 >= openingTime1)
  ) {
    throw new UseCaseValidationError(
      `Overlapping hours detected for day ${hour1.dayOfWeek}`,
    )
  }
}

export function validateHour(hour: IHours) {
  const openingTime = new Date(`2025-01-01T${hour.openingTime}:00.000Z`)
  const closingTime = new Date(`2025-01-01T${hour.closingTime}:00.000Z`)
  validationOpeningAndClosingTime(hour.openingTime, hour.closingTime)
  validateIntervalHour(openingTime, closingTime)
}

export function validationOpeningAndClosingTime(
  openingTime: string,
  closingTime: string,
) {
  if (openingTime >= closingTime) {
    throw new UseCaseValidationError(
      'The closing time must be greater than opening time',
    )
  }
}

export function validateIntervalHour(openingTime: Date, closingTime: Date) {
  const diff = closingTime.getTime() - openingTime.getTime()
  const allowedIntervalMinutes = 15
  const diffMinutes = diff / (60 * 1000)
  if (diffMinutes >= allowedIntervalMinutes) return
  throw new UseCaseValidationError(
    `The minimum interval between opening and closing time is ${allowedIntervalMinutes} minutes`,
  )
}
