import dotEnv from 'dotenv'

console.log(`Environment:  ${process.env.NODE_ENV}`)

let envPath = '.env'

if (process.env.NODE_ENV === 'dev') {
  envPath = '.env.dev'
} else if (process.env.NODE_ENV === 'test') {
  envPath = '.env.test'
}

dotEnv.config({ path: envPath })
