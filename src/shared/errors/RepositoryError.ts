export class RepositoryError extends Error {
  constructor(message: string) {
    super(`Validation Error: ${message}`)
  }
}
