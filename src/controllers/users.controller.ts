import { type Handler } from 'express'
import { getUsersService } from '../services/users.service'

export const getUsers: Handler = async (req, res) => {
  const userService: any = await getUsersService()

  const status = userService.code
  res.status(status).json(userService)
}
