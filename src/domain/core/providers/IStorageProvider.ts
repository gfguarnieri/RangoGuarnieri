import { IFileUploaded } from '../models/IFileUploaded'

export interface IStorageProvider {
  upload(file: IFileUploaded, bucket: string): Promise<string>
  delete(file: string, bucket: string): Promise<void>
  getUrl(file: string, bucket: string): string
}
