import 'reflect-metadata'
import { container } from 'tsyringe'
import { RestaurantRepository } from 'infra/restaurant/typeorm/RestaurantRepository'
import { DependencyInjectionTokens } from './DependencyInjectionTokens'

container.register(
  DependencyInjectionTokens.RestaurantRepository,
  RestaurantRepository,
)
