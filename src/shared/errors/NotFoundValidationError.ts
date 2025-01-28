export class NotFoundValidationError extends Error {
  constructor(message: string) {
    super(`Validation Error: ${message}`)
  }
}
