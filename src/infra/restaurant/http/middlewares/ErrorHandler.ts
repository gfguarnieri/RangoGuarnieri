import { Request, Response, NextFunction } from 'express'
import { StatusCodes } from 'http-status-codes'
import { InputValidationError } from 'shared/errors/InputValidationError'
import { UseCaseValidationError } from 'shared/errors/UseCaseValidationError'

export function ErrorHandler(
  err: Error,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction,
) {
  if (err instanceof UseCaseValidationError) {
    return res.status(400).json({
      type: 'usecase',
      error: err.message,
    })
  }

  if (err instanceof InputValidationError) {
    return res.status(400).json({
      type: 'input_validation',
      error: err.message,
      errors: err.errors,
    })
  }

  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    error: 'Internal Server Error',
  })
}
