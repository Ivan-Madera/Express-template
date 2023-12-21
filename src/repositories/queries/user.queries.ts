import User, { type UserInstance } from '../../database/models/user.model'

export const findAllUsers = async (): Promise<UserInstance[]> => {
  return await User.findAll()
}
