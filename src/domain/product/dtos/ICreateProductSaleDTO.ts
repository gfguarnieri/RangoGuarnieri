import { IProductSale } from '../models/IProductSale'

export interface ICreateProductSaleDTO extends Omit<IProductSale, 'id'> {}
