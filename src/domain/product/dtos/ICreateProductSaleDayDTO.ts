import { IProductSaleDay } from '../models/IProductSaleDays'

export interface ICreateProductSaleDayDTO extends Omit<IProductSaleDay, 'id'> {}
