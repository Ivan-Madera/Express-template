import { validationResult } from 'express-validator'
import { Codes } from '../utils/codeStatus'
import { ErrorValidator } from '../utils/jsonResponses'

export const validateResult = (req: any, res: any, next: any): any => {
  try {
    validationResult(req).throw()
    return next()
  } catch (error: any) {
    res
      .status(Codes.badRequest)
      .json(ErrorValidator(error.array(), Codes.badRequest))
  }
}
