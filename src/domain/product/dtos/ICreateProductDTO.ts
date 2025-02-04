import { IProduct } from '../models/IProduct'

export interface ICreateProductDTO extends Omit<IProduct, 'id'> {}
