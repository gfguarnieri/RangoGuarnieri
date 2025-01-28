import 'reflect-metadata'
import '../../container'
import '../../config/environment'
import cors from 'cors'
import express from 'express'
import { router } from './routes'
import { RangoDataSource } from '../typeorm/connection'

export const app = express()

app.use(express.json())
app.use(cors())

app.use(router)

export default async function start() {
  await RangoDataSource.initialize()
  app.listen(3333, () => {
    console.log('🚀 Server is running on port 3333')
  })
}
