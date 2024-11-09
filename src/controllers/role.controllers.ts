import databaseService from '~/services/database.service'
import { Request, Response } from 'express'
import { ObjectId } from 'mongodb'
// [GET] /role
export const GetIndexController = async (req: Request, res: Response) => {
  const records = await databaseService.Role.find({ deleted: false }).toArray()
  res.render('pages/role/index', {
    pageTitle: 'Danh sách phân quyền',
    records
  })
}
// [GET] /create
export const GetCreateController = async (req: Request, res: Response) => {
  res.render('pages/role/create', {
    pageTitle: 'Thêm mới phân quyền'
  })
}
// [GET] /edit/:id
export const GetEditController = async (req: Request, res: Response) => {
  const id = req.params.id
  const record = await databaseService.Role.findOne({ _id: new ObjectId(id), deleted: false })
  res.render('pages/role/edit', {
    pageTitle: 'Sửa phân quyền',
    record
  })
}
// [GET] /permission
export const GetPermissionController = async (req: Request, res: Response) => {
  const records = await databaseService.Role.find({ deleted: false }).toArray()
  res.render('pages/role/permission', {
    pageTitle: 'Phân quyền hệ thống',
    records
  })
}
