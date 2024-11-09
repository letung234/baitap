import { Request, Response } from 'express'
import databaseService from '../services/database.service'
import { limmit } from '../constants/dir'
import { salaryType } from '../constants/enums'
import { ObjectId } from 'mongodb'
// [GET] /Salary
export const GetSalaryController = async (req: Request, res: Response) => {
  const countProducts = await databaseService.SalaryPortion.countDocuments({ deleted: false })
  const filterId = await databaseService.SalaryPortion.find({ deleted: false }).project({ _id: 1, ten: 1 }).toArray()
  const filter_by = [
    {
      name: '_id',
      operators: ['>', '<', '='],
      selections: filterId.map((item: any) => ({ value: item._id, ten: item.ten }))
    },
    {
      name: 'ten',
      operators: ['>', '<', '=']
    },
    {
      name: 'loai',
      operators: ['='],
      selections: [
        { value: salaryType.KhauTru, ten: 'Khấu trừ' },
        { value: salaryType.ThuNhap, ten: 'Thu Nhập' }
      ]
    },
    {
      name: 'mo_ta',
      operators: ['>', '<', '=']
    },
    {
      name: 'is_active',
      operators: ['='],
      selections: [
        { value: true, ten: 'Đã Bật' },
        { value: false, ten: 'Vô Hiệu Hóa' }
      ]
    },
    {
      name: 'ngay_tao',
      operators: ['>', '<', '=']
    }
  ]
  const salary = await databaseService.SalaryPortion.find({ deleted: false }).limit(limmit).toArray()
  res.render('pages/salary/index', {
    pageTitle: 'Phân Lương',
    salary,
    countProducts,
    limit: limmit,
    filter_by
  })
}
// [GET] /Salary/create
export const GetCreateSalaryController = async (req: Request, res: Response) => {
  const Account = await databaseService.Account.find({}).toArray()
  const Company = await databaseService.Company.find({}).toArray()
  res.render('pages/salary/create', {
    pageTitle: 'Thêm Mới Phân Lương',
    Account,
    Company
  })
}
// [GET] /Salary/edit/:id
export const GeteditSalaryController = async (req: Request, res: Response) => {
  const salaryId = req.params.id
  const salary = await databaseService.SalaryPortion.findOne({ _id: new ObjectId(salaryId) })
  const accounts = await databaseService.Account.find({}).toArray()
  const companies = await databaseService.Company.find({}).toArray()
  if (salary) {
    res.render('pages/salary/edit', {
      pageTitle: 'Chỉnh Sửa Phân Lương',
      Salary: salary,
      Account: accounts,
      Company: companies
    })
  } else {
    res.render('page/error/404')
  }
}
