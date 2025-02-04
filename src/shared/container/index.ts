import 'reflect-metadata'
import { container } from 'tsyringe'
import { RestaurantRepository } from 'infra/restaurant/typeorm/RestaurantRepository'
import { CategoryRepository } from 'infra/product/typeorm/CategoryRepository'
import { DependencyInjectionTokens } from './DependencyInjectionTokens'
import { RestaurantHoursRepository } from 'infra/restaurant/typeorm/RestaurantHoursRepository'
import { LocalStorage } from '../infra/providers/LocalStorage'
import { ProductRepository } from 'infra/product/typeorm/ProductRepository'

container.register(
  DependencyInjectionTokens.RestaurantRepository,
  RestaurantRepository,
)

container.register(
  DependencyInjectionTokens.RestaurantHoursRepository,
  RestaurantHoursRepository,
)

container.register(
  DependencyInjectionTokens.CategoryRepository,
  CategoryRepository,
)

container.register(
  DependencyInjectionTokens.ProductRepository,
  ProductRepository,
)

container.register(DependencyInjectionTokens.StorageProvider, LocalStorage)
