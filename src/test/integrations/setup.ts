import { app } from '../../shared/infra/http/server'
import { RangoDataSource } from '../../shared/infra/typeorm/connection'
import { beforeAll, afterAll, beforeEach } from 'vitest'
import request from 'supertest'

beforeAll(async () => {
  if (!RangoDataSource.isInitialized) {
    await RangoDataSource.initialize()
  }
})

afterAll(async () => {
  if (RangoDataSource.isInitialized) {
    await RangoDataSource.destroy()
  }
})

beforeEach(async () => {
  // Clear all tables before each test
  const entities = RangoDataSource.entityMetadatas
  for (const entity of entities) {
    const repository = RangoDataSource.getRepository(entity.name)
    await repository.query(`TRUNCATE TABLE "${entity.tableName}" CASCADE;`)
  }
})

export const testRequest = request(app)
