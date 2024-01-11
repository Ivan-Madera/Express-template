import User, { type UserInstance } from '../../database/models/user.model'

export const findOneUser = async (
  usuario: string,
  attributes?: string[]
): Promise<UserInstance | null> => {
  return await User.findOne({
    where: {
      usuario
    },
    attributes
  })
}

export const findAllUsers = async (): Promise<UserInstance[]> => {
  return await User.findAll()
}
