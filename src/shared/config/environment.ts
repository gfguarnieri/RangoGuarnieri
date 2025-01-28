import dotEnv from 'dotenv'

console.log(`Environment:  ${process.env.NODE_ENV}`)

dotEnv.config({
  path: process.env.NODE_ENV === 'dev' ? '.env.dev' : '.env',
})
