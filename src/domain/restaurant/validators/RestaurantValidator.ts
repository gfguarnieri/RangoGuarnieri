import { InputValidationError } from 'shared/errors/InputValidationError'
import { IRestaurant } from '../models/IRestaurant'

export class RestaurantValidator {
  static Validate(input: Partial<IRestaurant>) {
    if (!input.state || input.state.length !== 2) {
      throw new InputValidationError(
        'State is required and must have 2 characters',
      )
    }
    if (!input.name) {
      throw new InputValidationError('Name is required')
    }
    if (!input.image) {
      throw new InputValidationError('Image is required')
    }
  }
}
