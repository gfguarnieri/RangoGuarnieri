import { ICreateProductSaleDTO } from 'domain/product/dtos/ICreateProductSaleDTO'
import { IUpdateProductSaleDTO } from 'domain/product/dtos/IUpdateProductSaleDTO'
import { ProductSale } from 'domain/product/entities/ProductSale'
import { IProductSaleRepository } from 'domain/product/repositories/IProductSaleRepository'

export class InMemoryProductSaleRepository implements IProductSaleRepository {
  private productSales: ProductSale[] = []

  async create(data: ICreateProductSaleDTO): Promise<ProductSale> {
    const productSale = new ProductSale(data)
    this.productSales.push(productSale)
    return productSale
  }

  async update(
    id: string,
    data: IUpdateProductSaleDTO,
  ): Promise<ProductSale | undefined> {
    const productSaleIndex = this.productSales.findIndex(
      (sale) => sale.id === id,
    )
    if (productSaleIndex === -1) {
      return undefined
    }
    const updatedProductSale = {
      ...this.productSales[productSaleIndex],
      ...data,
    }
    this.productSales[productSaleIndex] = updatedProductSale
    return updatedProductSale
  }

  async findByProductId(productId: string): Promise<ProductSale[]> {
    return this.productSales.filter((sale) => sale.productId === productId)
  }

  async listByProductId(productId: string): Promise<ProductSale[]> {
    return this.productSales.filter((sale) => sale.productId === productId)
  }

  async findById(id: string): Promise<ProductSale | undefined> {
    return this.productSales.find((sale) => sale.id === id)
  }

  async getActiveSale(productId: string): Promise<ProductSale | undefined> {
    return this.productSales.find(
      (sale) => sale.productId === productId && sale.active,
    )
  }

  async active(productId: string, productSaleId: string): Promise<void> {
    const productSale = this.productSales.find(
      (sale) => sale.productId === productId && sale.id === productSaleId,
    )
    if (!productSale) return
    productSale.active = true
  }

  async inactive(productId: string, productSaleId: string): Promise<void> {
    const productSale = this.productSales.find(
      (sale) => sale.productId === productId && sale.id === productSaleId,
    )
    if (!productSale) return
    productSale.active = false
  }

  async inactiveAll(productId: string): Promise<void> {
    this.productSales = this.productSales.map((sale) => {
      if (sale.productId === productId) {
        sale.active = false
      }
      return sale
    })
  }

  async delete(productId: string, productSaleId: string): Promise<void> {
    this.productSales = this.productSales.filter(
      (sale) => sale.productId !== productId && sale.id !== productSaleId,
    )
  }
}
