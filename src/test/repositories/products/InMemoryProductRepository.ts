import { ICreateProductDTO } from 'domain/product/dtos/ICreateProductDTO'
import { Product } from 'domain/product/entities/Product'
import { IProduct } from 'domain/product/models/IProduct'
import { IProductRepository } from 'domain/product/repositories/IProductRepository'

export class InMemoryProductRepository implements IProductRepository {
  private products: IProduct[] = []

  async create(data: ICreateProductDTO): Promise<IProduct> {
    const product = new Product(data)
    this.products.push(product)
    return product
  }

  async update(id: string, data: IProduct): Promise<IProduct | undefined> {
    const productIndex = this.products.findIndex((product) => product.id === id)
    if (productIndex === -1) {
      return undefined
    }
    const updatedProduct = { ...this.products[productIndex], ...data }
    this.products[productIndex] = updatedProduct
    return updatedProduct
  }

  async list(): Promise<IProduct[]> {
    return this.products
  }

  async listByCategoryId(categoryId: string): Promise<IProduct[]> {
    return this.products.filter((product) => product.categoryId === categoryId)
  }

  async listByRestaurantId(restaurantId: string): Promise<IProduct[]> {
    return this.products.filter(
      (product) => product.restaurantId === restaurantId,
    )
  }

  async findById(id: string): Promise<IProduct | undefined> {
    return this.products.find((product) => product.id === id)
  }

  async delete(id: string): Promise<void> {
    this.products = this.products.filter((product) => product.id !== id)
  }
}
