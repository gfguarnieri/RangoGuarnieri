export enum DayOfWeek {
  SUNDAY = 'SUNDAY',
  MONDAY = 'MONDAY',
  TUESDAY = 'TUESDAY',
  WEDNESDAY = 'WEDNESDAY',
  THURSDAY = 'THURSDAY',
  FRIDAY = 'FRIDAY',
  SATURDAY = 'SATURDAY',
}

export interface IRestaurantHours {
  id?: string
  restaurantId?: string
  dayOfWeek: DayOfWeek
  openingTime: string
  closingTime: string
}
