import { IHours } from 'domain/core/models/IHours'

export interface IProductSale extends IHours {
  productId?: string
  priceWithDiscount: number
  createdAt?: Date
}
