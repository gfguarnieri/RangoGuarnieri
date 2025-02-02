import multer from 'multer'
import { Request } from 'express'
import { z } from '@zod/i18n'

export function MulterConfig() {
  const envValuesSchema = z.object({
    FILE_SIZE_LIMIT: z.string(),
  })
  const envParse = envValuesSchema.safeParse(process.env)

  if (!envParse.success) {
    throw new Error('Invalid environment variables')
  }

  const fileFilter = (
    req: Request,
    file: Express.Multer.File,
    cb: multer.FileFilterCallback,
  ) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true)
    } else {
      cb(new Error('Only images are allowed'))
    }
  }

  const storage = multer.memoryStorage()

  return multer({
    limits: {
      fileSize: parseInt(envParse.data.FILE_SIZE_LIMIT) * 1024 * 1024,
    },
    fileFilter,
    storage,
  })
}
