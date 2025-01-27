export class UseCaseValidationError extends Error {
  constructor(message: string) {
    super(`Validation Error: ${message}`)
  }
}
