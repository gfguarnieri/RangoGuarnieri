import { randomUUID } from 'crypto'
import { DayOfWeek } from 'domain/core/models/IHours'
import { IProductSaleDay } from '../models/IProductSaleDays'

export class ProductSaleDay {
  id?: string
  productSaleId?: string
  dayOfWeek: DayOfWeek
  openingTime: string
  closingTime: string
  createdAt?: Date

  constructor(props: IProductSaleDay, id?: string) {
    this.id = id ?? randomUUID()
    this.productSaleId = props.productSaleId
    this.dayOfWeek = props.dayOfWeek
    this.openingTime = props.openingTime
    this.closingTime = props.closingTime
    this.createdAt = props.createdAt
  }
}
