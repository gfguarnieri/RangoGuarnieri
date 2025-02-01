import 'reflect-metadata'
import { container } from 'tsyringe'
import { RestaurantRepository } from 'infra/restaurant/typeorm/RestaurantRepository'
import { DependencyInjectionTokens } from './DependencyInjectionTokens'
import { RestaurantHoursRepository } from 'infra/restaurant/typeorm/RestaurantHoursRepository'

container.register(
  DependencyInjectionTokens.RestaurantRepository,
  RestaurantRepository,
)

container.register(
  DependencyInjectionTokens.RestaurantHoursRepository,
  RestaurantHoursRepository,
)
