import { randomUUID } from 'crypto'
import { IFileUploaded } from 'domain/core/models/IFileUploaded'
import { IStorageProvider } from 'domain/core/providers/IStorageProvider'
import { promises as fs } from 'fs'
import mime from 'mime-types'
import path from 'path'

export class LocalStorage implements IStorageProvider {
  async upload(
    { filebuffer, filemime, filename }: IFileUploaded,
    bucket: string,
  ): Promise<string> {
    const extension = mime.extension(filemime)
    const uniqueName = this.generateUniqueFileName(
      filename,
      extension.toString(),
    )
    const filePath = path.join('./public/uploads', bucket, uniqueName)

    await fs.writeFile(filePath, filebuffer)
    return uniqueName
  }

  async delete(name: string, bucket: string): Promise<void> {
    const filePath = path.join('./public/uploads', bucket, name)
    try {
      await fs.access(filePath)
      await fs.unlink(filePath)
    } catch {
      console.log(`File doesn't exist ${filePath}`)
    }
  }

  private generateUniqueFileName(
    originalName: string,
    extension: string,
  ): string {
    const uuid = randomUUID()
    return `${uuid}.${extension}`
  }

  getUrl(file: string, bucket: string): string {
    return `${process.env.APP_URL}/uploads/${bucket}/${file}`
  }
}
