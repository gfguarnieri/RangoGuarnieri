import { IProductSaleDay } from './IProductSaleDays'

export interface IProductSale {
  id?: string
  productId: string
  promotionPrice: number
  description: string
  active: boolean
  productSaleDay?: IProductSaleDay[]
  createdAt?: Date
  updatedAt?: Date
}
