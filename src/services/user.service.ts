import env from '../config/callEnv'
import {
  commitTransaction,
  manageTransaction,
  rollbackTransaction
} from '../database/transaction'
import {
  type IResponseMessage,
  type IErrorObject,
  type ISuccessObject
} from '../entities/jsonResponses.entity'
import { type IUserObj } from '../entities/user.entity'
import { createUser, updateUser } from '../repositories/mutations/user.mutation'
import { findAllUsers } from '../repositories/queries/user.query'
import { Codes } from '../utils/codeStatus'
import {
  ErrorObject,
  ResponseMessage,
  SuccessObject
} from '../utils/jsonResponses'
import { sign } from 'jsonwebtoken'

export const getAccessTokenService = async (): Promise<
  ISuccessObject | IErrorObject
> => {
  let status = Codes.errorServer

  try {
    const secret = env.SECRET_KEY
    const uid = new Date().getTime()

    const token = sign({ uid }, secret, { expiresIn: '1h' })

    const data = { token }
    status = Codes.success
    return SuccessObject(data, status)
  } catch (error) {
    return ErrorObject(error, status)
  }
}

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

export const createUserService = async (
  userObj: IUserObj
): Promise<ISuccessObject | IErrorObject> => {
  let status = Codes.errorServer
  const t = await manageTransaction()

  try {
    const findCreate = await createUser(userObj, t)

    await commitTransaction(t)
    status = Codes.success
    return SuccessObject(findCreate, status)
  } catch (error) {
    await rollbackTransaction(t, 'createUserService')
    return ErrorObject(error, status)
  }
}

export const updateUserService = async (
  nombres: string,
  usuario: string
): Promise<IResponseMessage | IErrorObject> => {
  let status = Codes.errorServer
  const message = 'Usuario actualizado con exito'
  const t = await manageTransaction()

  try {
    await updateUser(
      { nombres },
      {
        where: {
          usuario
        },
        transaction: t
      }
    )

    await commitTransaction(t)
    status = Codes.success
    return ResponseMessage(message, status)
  } catch (error) {
    await rollbackTransaction(t, 'updateUserService')
    return ErrorObject(error, status)
  }
}
