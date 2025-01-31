export interface ItemValidationError {
  field: string
  message: string
}

export class InputValidationError extends Error {
  private _errors: ItemValidationError[]
  constructor(message: string, errors: ItemValidationError[]) {
    super(`Validation Error: ${message}`)
    this._errors = errors
  }

  public get errors() {
    return this._errors
  }
}
