import { Request, Response, NextFunction } from 'express'
import { StatusCodes } from 'http-status-codes'
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
      type: 'validation',
      error: err.message,
    })
  }

  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    error: 'Internal Server Error',
  })
}
