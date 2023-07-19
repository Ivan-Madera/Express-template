import { body } from 'express-validator'
import { validateResult } from '../middlewares/validation'

export const diariesCreateValidator = [
  body('date').notEmpty().isString().isDate(),
  body('weather').notEmpty().isString(),
  body('visibility').notEmpty().isString(),
  body('comment').optional().isString(),
  (req: any, res: any, next: any) => {
    validateResult(req, res, next)
  }
]
