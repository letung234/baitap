import databaseService from '../services/database.service'
import { Request, Response } from 'express'
import { salaryType } from '../constants/enums'
import { ObjectId } from 'mongodb'
import { limmit } from '../constants/dir'
// [GET] /salarystructure/create
export const GetCreateController = async (req: Request, res: Response) => {
  const company = await databaseService.Company.find({}).toArray()
  const formofpayment = await databaseService.FormOfPayment.find({}).toArray()
  const SalaryportionTN = await databaseService.SalaryPortion.find({
    deleted: false,
    loai: salaryType.ThuNhap
  }).toArray()
  const SalaryportionKT = await databaseService.SalaryPortion.find({
    deleted: false,
    loai: salaryType.KhauTru
  }).toArray()
  const paymentAccount = await databaseService.PayMentAccount.find({}).toArray()
  console.log(paymentAccount)
  console.log(formofpayment)
  console.log(company)
  res.render('pages/salarystructure/create', {
    pageTitle: 'Thêm mới cơ cấu lương',
    company,
    formofpayment,
    SalaryportionTN,
    SalaryportionKT,
    paymentAccount
  })
}
// [GET] /salarystructure
export const GetIndexController = async (req: Request, res: Response) => {
  const countProducts = await databaseService.SalaryStructure.countDocuments({ deleted: false })
  const filterId = await databaseService.SalaryStructure.find({ deleted: false }).project({ _id: 1, ten: 1 }).toArray()
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
      name: 'status',
      operators: ['='],
      selections: [
        { value: true, ten: 'Có' },
        { value: false, ten: 'Không' }
      ]
    },
    {
      name: 'chu_ky_phat_luong',
      operators: ['>', '<', '=']
    },
    {
      name: 'don_vi_tien_te',
      operators: ['>', '<', '=']
    },
    {
      name: 'updated_at',
      operators: ['>', '<', '=']
    }
  ]
  const salaryStructure = await databaseService.SalaryStructure.find({ deleted: false }).limit(limmit).toArray()
  res.render('pages/salarystructure/index', {
    pageTitle: 'Cơ cấu lương',
    salaryStructure,
    countProducts,
    limit: limmit,
    filter_by
  })
}
// [GET] /salarystructure/edit/:id
export const GetEditController = async (req: Request, res: Response) => {
  const id = req.params.id
  const company = await databaseService.Company.find({}).toArray()
  const formofpayment = await databaseService.FormOfPayment.find({}).toArray()
  const SalaryportionTN = await databaseService.SalaryPortion.find({
    deleted: false,
    loai: salaryType.ThuNhap
  }).toArray()
  const SalaryportionKT = await databaseService.SalaryPortion.find({
    deleted: false,
    loai: salaryType.KhauTru
  }).toArray()
  const paymentAccount = await databaseService.PayMentAccount.find({}).toArray()
  const salaryStructure = await databaseService.SalaryStructure.findOne({ deleted: false, _id: new ObjectId(id) })
  if (salaryStructure) {
    res.render('pages/salarystructure/edit', {
      pageTitle: 'Chỉnh Sửa Phân Lương',
      Salary: salaryStructure,
      company,
      formofpayment,
      SalaryportionTN,
      SalaryportionKT,
      paymentAccount
    })
  } else {
    res.render('page/error/404')
  }
}
