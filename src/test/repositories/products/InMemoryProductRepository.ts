import { ICreateProductDTO } from 'domain/product/dtos/ICreateProductDTO'
import { Product } from 'domain/product/entities/Product'
import { IProductRepository } from 'domain/product/repositories/IProductRepository'

export class InMemoryProductRepository implements IProductRepository {
  private products: Product[] = []

  async create(data: ICreateProductDTO): Promise<Product> {
    const product = new Product(data)
    this.products.push(product)
    return product
  }

  async update(id: string, data: Product): Promise<Product | undefined> {
    const productIndex = this.products.findIndex((product) => product.id === id)
    if (productIndex === -1) {
      return undefined
    }
    const updatedProduct = { ...this.products[productIndex], ...data }
    this.products[productIndex] = updatedProduct
    return updatedProduct
  }

  async list(): Promise<Product[]> {
    return this.products
  }

  async listByCategoryId(categoryId: string): Promise<Product[]> {
    return this.products.filter((product) => product.categoryId === categoryId)
  }

  async listByRestaurantId(restaurantId: string): Promise<Product[]> {
    return this.products.filter(
      (product) => product.restaurantId === restaurantId,
    )
  }

  async findById(id: string): Promise<Product | undefined> {
    return this.products.find((product) => product.id === id)
  }

  async delete(id: string): Promise<void> {
    this.products = this.products.filter((product) => product.id !== id)
  }
}
