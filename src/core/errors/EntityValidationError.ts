export class EntityValidationError extends Error {
  constructor(message: string) {
    super(`Validation Error: ${message}`)
  }
}
