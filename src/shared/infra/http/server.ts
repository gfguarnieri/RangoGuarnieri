import 'reflect-metadata'
import '../typeorm'
import '../../container'
import 'express-async-errors'
import cors from 'cors'
import express from 'express'
import { router } from './routes'

export const app = express()

app.use(express.json())
app.use(cors())

app.use(router)
