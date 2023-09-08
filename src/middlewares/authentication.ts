import { Codes } from '../utils/CodeStatus'
import env from '../config/callenv'
import { ErrorObject, ResponseMessage } from '../utils/JsonResponses'

export const checkAuth = (req: any, res: any, next: any): any => {
  let status = Codes.errorServer
  const message = 'No autorizado'

  try {
    const token = req.get('token')

    if (token === env.TOKEN) {
      return next()
    }

    status = Codes.unauthorized
    return res.status(status).json(ResponseMessage(message, status))
  } catch (error) {
    return res.status(status).json(ErrorObject(error, status))
  }
}
