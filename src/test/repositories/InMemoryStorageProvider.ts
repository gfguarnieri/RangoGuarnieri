import { IFileUploaded } from 'domain/core/models/IFileUploaded'
import { IStorageProvider } from 'domain/core/providers/IStorageProvider'

export class InMemoryStorageProvider implements IStorageProvider {
  private storage: Map<string, Map<string, IFileUploaded>> = new Map()

  async upload(file: IFileUploaded, bucket: string): Promise<string> {
    if (!this.storage.has(bucket)) {
      this.storage.set(bucket, new Map())
    }
    const bucketStorage = this.storage.get(bucket)!
    bucketStorage.set(file.filename, file)

    return file.filename
  }

  async delete(file: string, bucket: string): Promise<void> {
    const bucketStorage = this.storage.get(bucket)
    if (bucketStorage) {
      bucketStorage.delete(file)
    }
  }

  getUrl(file: string, bucket: string): string {
    return `${bucket}/${file}`
  }
}
