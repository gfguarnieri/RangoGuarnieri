import { z } from 'zod'
import { DataSource } from 'typeorm'

const envSchema = z.object({
  PG_HOST: z.string(),
  PG_PORT: z.string(),
  PG_USERNAME: z.string(),
  PG_PASSWORD: z.string(),
  PG_DATABASE: z.string(),
})

const envParse = envSchema.safeParse(process.env)

if (!envParse.success) {
  throw new Error('Invalid environment variables')
}

const { PG_HOST, PG_PORT, PG_USERNAME, PG_PASSWORD, PG_DATABASE } =
  envParse.data

const RangoDataSource = new DataSource({
  type: 'postgres',
  host: PG_HOST,
  port: parseInt(PG_PORT),
  username: PG_USERNAME,
  password: PG_PASSWORD,
  database: PG_DATABASE,
})

RangoDataSource.initialize()
  .then(() => console.log('🚀 Database connection initialized successfully'))
  .catch((error) => {
    console.error('‼️ Error during database initialization:', error)
    process.exit(1)
  })

export { RangoDataSource }
