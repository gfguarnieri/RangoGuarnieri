import { EntityValidationError } from '@core/errors/EntityValidationError'
import { UniqueEntityID } from '@core/entities/UniqueId'

export interface RestaurantProps {
  name: string
  image: string
  address?: string
  number?: string
  city?: string
  state?: string
  country?: string
  postalCode?: string
}

export class Restaurant {
  private _id: UniqueEntityID
  private props: RestaurantProps

  constructor(props: RestaurantProps, id?: UniqueEntityID) {
    this._id = id ?? new UniqueEntityID()
    this.props = props
    this.validate()
  }

  private validate() {
    if (!this.props.name || this.props.name === '') {
      throw new EntityValidationError('Name is required')
    }

    if (!this.props.image) {
      throw new EntityValidationError('Image is required')
    }
  }

  static create(props: RestaurantProps, id?: UniqueEntityID) {
    return new Restaurant(props, id)
  }

  static update(restaurant: Restaurant, props: RestaurantProps) {
    const updatedRestaurant = new Restaurant(props, restaurant.id)
    return updatedRestaurant
  }

  get id() {
    return this._id
  }

  get name() {
    return this.props.name
  }

  get image() {
    return this.props.image
  }

  get address() {
    return this.props.address
  }

  get number() {
    return this.props.number
  }

  get city() {
    return this.props.city
  }

  get state() {
    return this.props.state
  }

  get country() {
    return this.props.country
  }

  get postalCode() {
    return this.props.postalCode
  }
}
