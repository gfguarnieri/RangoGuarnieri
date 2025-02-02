import 'reflect-metadata'
import { container } from 'tsyringe'
import { RestaurantRepository } from 'infra/restaurant/typeorm/RestaurantRepository'
import { DependencyInjectionTokens } from './DependencyInjectionTokens'
import { RestaurantHoursRepository } from 'infra/restaurant/typeorm/RestaurantHoursRepository'
import { LocalStorage } from '../infra/providers/LocalStorage'

container.register(
  DependencyInjectionTokens.RestaurantRepository,
  RestaurantRepository,
)

container.register(
  DependencyInjectionTokens.RestaurantHoursRepository,
  RestaurantHoursRepository,
)

container.register(DependencyInjectionTokens.StorageProvider, LocalStorage)
