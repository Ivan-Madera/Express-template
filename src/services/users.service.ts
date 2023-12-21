import {
  type IErrorObject,
  type ISuccessObject
} from '../interfaces/jsonResponses.dtos'
import { findAllUsers } from '../repositories/queries/user.queries'
import { Codes } from '../utils/CodeStatus'
import { ErrorObject, SuccessObject } from '../utils/JsonResponses'

export const getUsersService = async (): Promise<
  ISuccessObject | IErrorObject
> => {
  let status = Codes.errorServer

  try {
    const findUser = await findAllUsers()

    status = Codes.success
    return SuccessObject(findUser, status)
  } catch (error) {
    return ErrorObject(error, status)
  }
}
