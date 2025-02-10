import 'reflect-metadata'

import 'express-async-errors'
import cors from 'cors'
import express from 'express'
import swaggerUi from 'swagger-ui-express'

import '../../config/environment'
import '../../container'

import { router } from './routes'
import { RangoDataSource } from '../typeorm/connection'
import { ErrorHandler } from './middlewares/ErrorHandler'
import { swaggerDocs } from 'shared/docs/swagger'

export const app = express()
app.use(express.json())

app.use(cors())

app.use(express.static('./public/'))
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

app.use(router)

app.use(ErrorHandler)

export default async function start() {
  await RangoDataSource.initialize()
  app.listen(3333, () => {
    console.log('🚀 Server is running on port 3333')
  })
}
