import { randomUUID } from 'crypto'
import { IProductSale } from '../models/IProductSale'
import { ProductSaleDay } from './ProductSaleDay'

export class ProductSale {
  id?: string
  productId: string
  promotionPrice: number
  description: string
  active: boolean
  productSaleDay?: ProductSaleDay[]
  createdAt?: Date
  updatedAt?: Date

  constructor(props: IProductSale, id?: string) {
    this.id = id ?? randomUUID()
    this.productId = props.productId
    this.promotionPrice = props.promotionPrice
    this.description = props.description
    this.active = props.active
    this.productSaleDay = props.productSaleDay
    this.createdAt = props.createdAt
    this.updatedAt = props.updatedAt
  }
}
