import {
  InputValidationError,
  ItemValidationError,
} from 'shared/errors/InputValidationError'
import { IRestaurant } from '../models/IRestaurant'

export class RestaurantValidator {
  static Validate(input: Partial<IRestaurant>) {
    const errors: ItemValidationError[] = []

    if (!input.state || input.state.length !== 2) {
      errors.push({
        field: 'state',
        message: 'State is required and must have 2 characters',
      })
    }

    if (!input.name) {
      errors.push({
        field: 'name',
        message: 'Name is required',
      })
    }
    if (!input.image) {
      errors.push({
        field: 'image',
        message: 'Image is required',
      })
    }

    if (errors.length === 0) return

    throw new InputValidationError('Invalid Restaurant', errors)
  }
}
