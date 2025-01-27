import { InputValidationError } from '@core/errors/InputValidationError'
import { IRestaurant } from '../models/IRestaurant'

export class RestaurantValidator {
  static Validate(input: Partial<IRestaurant>) {
    if (!input.name) {
      throw new InputValidationError('Name is required')
    }
    if (!input.image) {
      throw new InputValidationError('Image is required')
    }
  }
}
