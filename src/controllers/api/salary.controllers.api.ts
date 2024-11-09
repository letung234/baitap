import { Request, Response } from 'express'
import {
  SalaryFilterRequestBody,
  DeleteSalaryRequestBody,
  SalaryCreateData,
  SalaryUpdateData
} from '../../models/requests/salary.request'
import { limmit } from '../../constants/dir'
import salaryService from '../../services/salary.services'
import HTTP_STATUS from '../../constants/httpStatus'
import { SALARY_MESSAGES } from '../../constants/messages'
// [POST] /api/salary/filter
export const ApiSalaryFilterController = async (
  req: Request<any, any, SalaryFilterRequestBody, any>,
  res: Response
) => {
  const limit = limmit
  const result = await salaryService.filterSalaries(req.body, limit)
  res.status(200).json(result)
}

// [Delete] /api/salary/delete-items
export const ApiDeleteSalaryFilterController = async (
  req: Request<any, any, DeleteSalaryRequestBody, any>, // Sử dụng interface cho body
  res: Response
) => {
  const { ids } = req.body

  const deletedCount = await salaryService.deleteSalaries(ids)

  if (deletedCount > 0) {
    return res.status(HTTP_STATUS.OK).json({ message: SALARY_MESSAGES.SALARY_DELETE_SUCCESS, deletedCount })
  } else {
    return res.status(HTTP_STATUS.NOT_FOUND).json({ message: SALARY_MESSAGES.SALARY_NOT_FOUND })
  }
}

export const ApiPostSalaryFilterController = async (req: Request<any, any, SalaryCreateData, any>, res: Response) => {
  const { ten, loai, mo_ta, is_active, tai_khoan_ke_toan } = req.body
  // Gọi hàm createSalary từ service để xử lý logic
  await salaryService.createSalary({ ten, loai, mo_ta, is_active, tai_khoan_ke_toan })
  // Trả về phản hồi thành công
  return res.status(201).json({
    message: SALARY_MESSAGES.SALARY_ADD_SUCCESS // Sử dụng thông điệp từ SALARY_MESSAGES
  })
}

export const ApieditSalaryFilterController = async (req: Request<any, any, SalaryUpdateData, any>, res: Response) => {
  const salaryId = req.params.id
  const { ten, loai, mo_ta, is_active, tai_khoan_ke_toan } = req.body
  const result = await salaryService.updateSalary(salaryId, { ten, loai, mo_ta, is_active, tai_khoan_ke_toan })
  if (result.modifiedCount === 0) {
    return res.status(404).json({
      message: SALARY_MESSAGES.SALARY_NOT_FOUND
    })
  }
  return res.status(200).json({
    message: SALARY_MESSAGES.SALARY_UPDATE_SUCCESS
  })
}
