import { Request, Response } from 'express'
import UsersService from '../../services/users.service'
import { UserPayload } from '../../models/requests/user.request'
import HTTP_STATUS from '../../constants/httpStatus'
import { hashPassword } from '../../utils/crypto'
import User from '../../models/schemas/user.model'
import { USER_MESSAGES } from '../../constants/messages'
import databaseService from '../../services/database.service'
export const PostCreateUsers = async (req: Request<any, any, UserPayload, any>, res: Response) => {
  const data = { ...req.body }
  data.password = hashPassword(data.password)
  const result = await UsersService.Register(data)
  console.log(result)
  return res.status(HTTP_STATUS.CREATED).json({ success: true })
}
export const PostLogoutUser = async (req: Request<any, any, UserPayload, any>, res: Response) => {
  res.clearCookie('access_token')
  res.clearCookie('refresh_token')
  const refreshToken = req.cookies?.refresh_token
  await databaseService.refreshTokens.deleteOne({ token: refreshToken })
  return res.status(HTTP_STATUS.OK).json({ success: true })
}

export const PatchEditUsers = async (req: Request<any, any, UserPayload, any>, res: Response) => {
  const { id } = req.params
  const data = { ...req.body }
  if (data.password) {
    data.password = hashPassword(data.password)
  }
  const result = await UsersService.Update(id, data)
  console.log(result)
  return res.status(HTTP_STATUS.OK).json({ success: true })
}

export const DeleteUser = async (req: Request<any, any, any, any>, res: Response) => {
  const { id } = req.params
  const result = await UsersService.Delete(id)
  return res.status(HTTP_STATUS.OK).json({ success: true })
}

export const PostLoginUser = async (req: Request<any, any, any, any, any>, res: Response) => {
  const user = req.user as User
  const result = await UsersService.Login({ user_id: user._id?.toString() as string })
  res.cookie('access_token', result.access_token, {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true,
    sameSite: 'strict'
  })
  res.cookie('refresh_token', result.refresh_token, {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true,
    sameSite: 'strict'
  })
  return res.status(HTTP_STATUS.OK).json({ success: true })
}
