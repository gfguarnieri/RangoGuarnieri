import 'reflect-metadata'

import 'express-async-errors'
import cors from 'cors'
import express from 'express'

import '../../config/environment'
import '../../container'

import { router } from './routes'
import { RangoDataSource } from '../typeorm/connection'
import { ErrorHandler } from './middlewares/ErrorHandler'

export const app = express()

app.use(express.json())

app.use(cors())

app.use(router)

app.use(ErrorHandler)

export default async function start() {
  await RangoDataSource.initialize()
  app.listen(3333, () => {
    console.log('🚀 Server is running on port 3333')
  })
}
