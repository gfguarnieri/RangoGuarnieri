import { EntityValidationError } from '@core/errors/EntityValidationError'
import { UniqueEntityID } from '@core/entities/UniqueId'
import { IRestaurantDTO } from '../dtos/IRestaurantDTO'

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
    const updatedRestaurant = new Restaurant(
      props,
      new UniqueEntityID(restaurant.id),
    )
    return updatedRestaurant
  }

  get object() {
    const restaurant: IRestaurantDTO = {
      id: this.id,
      name: this.name,
      image: this.image,
      address: this.address,
      number: this.number,
      city: this.city,
      state: this.state,
      country: this.country,
      postalCode: this.postalCode,
    }
    return restaurant
  }

  get id() {
    return this._id.toString()
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
