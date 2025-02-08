import { IHours } from 'domain/core/models/IHours'

export interface IProductSaleDay extends IHours {
  id?: string
  productSaleId?: string
  createdAt?: Date
}
