import { Request, Response } from 'express'
import { ObjectId } from 'mongodb'
import databaseService from '~/services/database.service'
// [GET] /users/login
export const GetLoginController = async (req: Request, res: Response) => {
  res.render('pages/user/login', {
    pageTitle: 'Đăng Nhập'
  })
}
// [GET] /users
export const GetUserController = async (req: Request, res: Response) => {
  const users = await databaseService.User.find({ deleted: false }).project({ password: 0 }).toArray()
  for (const user of users) {
    const role = await databaseService.Role.findOne({
      _id: new ObjectId(user.role_id),
      deleted: false
    })
    user.role = role
  }
  console.log(users)
  res.render('pages/user/index', {
    pageTitle: 'Danh sách tài khoản',
    records: users
  })
}
// [GET] /users/create
export const CreateUserController = async (req: Request, res: Response) => {
  const roles = await databaseService.Role.find({ deleted: false }).toArray()
  res.render('pages/user/create', {
    pageTitle: 'Tạo Tài Khoản',
    roles
  })
}
// [GET] /users/edit
export const EditUserController = async (req: Request, res: Response) => {
  const { id } = req.params
  const user = await databaseService.User.findOne({ _id: new ObjectId(id), deleted: false })
  const roles = await databaseService.Role.find({ deleted: false }).toArray()
  res.render('pages/user/edit', {
    pageTitle: 'Tạo Tài Khoản',
    roles,
    user
  })
}
