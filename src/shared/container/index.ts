import 'reflect-metadata'
import { container } from 'tsyringe'
import { RestaurantRepository } from 'infra/restaurant/typeorm/RestaurantRepository'
import { CategoryRepository } from 'infra/product/typeorm/CategoryRepository'
import { DependencyInjectionTokens } from './DependencyInjectionTokens'
import { RestaurantHoursRepository } from 'infra/restaurant/typeorm/RestaurantHoursRepository'
import { ProductRepository } from 'infra/product/typeorm/ProductRepository'
import { ProductSaleRepository } from 'infra/product/typeorm/ProductSaleRepository'
import { ProductSaleDayRepository } from 'infra/product/typeorm/ProductSaleDayRepository'
import { LocalStorage } from '../infra/providers/LocalStorage'

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

container.register(
  DependencyInjectionTokens.ProductSaleRepository,
  ProductSaleRepository,
)

container.register(
  DependencyInjectionTokens.ProductSaleDayRepository,
  ProductSaleDayRepository,
)

container.register(DependencyInjectionTokens.StorageProvider, LocalStorage)
