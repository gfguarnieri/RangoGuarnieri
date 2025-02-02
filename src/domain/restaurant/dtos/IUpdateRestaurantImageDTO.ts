import { IFileUploaded } from 'domain/core/models/IFileUploaded'

export interface IUpdateRestaurantImageDTO {
  restaurantId: string
  file: IFileUploaded
}
