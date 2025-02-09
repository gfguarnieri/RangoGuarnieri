import { ProductSale } from 'domain/product/entities/ProductSale'
import { Product } from 'domain/product/entities/Product'
import { getCurrentDayOfWeekAndHour, timeToInt } from './timeValidation'

export function verifySalePrice(productSale: ProductSale, product: Product) {
  product.price = Number(product.price)
  product.currentPrice = product.price

  if (!productSale?.productSaleDay?.length) {
    return
  }

  const currentDayAndHour = getCurrentDayOfWeekAndHour()
  const currentDay = productSale.productSaleDay.find(
    (day) => day.dayOfWeek === currentDayAndHour.dayOfWeek,
  )

  if (currentDay) {
    const currentTime = timeToInt(currentDayAndHour.hour)
    const openingTime = timeToInt(currentDay.openingTime)
    const closingTime = timeToInt(currentDay.closingTime)

    product.currentPrice =
      currentTime >= openingTime && currentTime <= closingTime
        ? productSale.promotionPrice
        : product.price
  }
}
