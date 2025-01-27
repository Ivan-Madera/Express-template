import { Codes } from '../utils/CodeStatus'
import { ErrorObject } from '../utils/JsonResponses'

export const headerNoCache = (_req: any, res: any, next: any): void => {
  const status = Codes.errorServer

  try {
    res.setHeader('Cache-Control', 'no-store')
    return next()
  } catch (error) {
    return res.status(status).json(ErrorObject(error, status))
  }
}
