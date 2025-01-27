export class InputValidationError extends Error {
  constructor(message: string) {
    super(`Validation Error: ${message}`)
  }
}
