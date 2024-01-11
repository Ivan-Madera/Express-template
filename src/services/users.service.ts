import { sequelize } from '../database/config'
import {
  type IResponseMessage,
  type IErrorObject,
  type ISuccessObject
} from '../interfaces/jsonResponses.dtos'
import { type IUserObj } from '../interfaces/user.dtos'
import {
  createUser,
  updateUser
} from '../repositories/mutations/user.mutations'
import { findAllUsers } from '../repositories/queries/user.queries'
import { Codes } from '../utils/CodeStatus'
import {
  ErrorObject,
  ResponseMessage,
  SuccessObject
} from '../utils/JsonResponses'

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
  const t = await sequelize.transaction()

  try {
    const findCreate = await createUser(userObj, t)

    await t.commit()
    status = Codes.success
    return SuccessObject(findCreate, status)
  } catch (error) {
    await t.rollback()
    return ErrorObject(error, status)
  }
}

export const updateUserService = async (
  nombres: string,
  usuario: string
): Promise<IResponseMessage | IErrorObject> => {
  let status = Codes.errorServer
  const message = 'Usuario actualizado con exito'
  const t = await sequelize.transaction()

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

    await t.commit()
    status = Codes.success
    return ResponseMessage(message, status)
  } catch (error) {
    await t.rollback()
    return ErrorObject(error, status)
  }
}
