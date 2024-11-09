import { Request, Response } from 'express'
import salaryStructureService from '~/services/salaryStructure.services'
import HTTP_STATUS from '~/constants/httpStatus'
import { SALARY_STRUCTURE_MESSAGE } from '~/constants/messages'
import { limmit } from '~/constants/dir'
export const ApiCreateController = async (req: Request<any, any, any, any>, res: Response) => {
  const data = req.body
  await salaryStructureService.create(data)
  return res.status(HTTP_STATUS.CREATED).json({ success: true })
}
export const ApiFilterController = async (req: Request<any, any, any, any>, res: Response) => {
  const limit = limmit
  const result = await salaryStructureService.filterSalaries(req.body, limit)
  res.status(200).json(result)
}
export const ApiEiditController = async (req: Request<any, any, any, any>, res: Response) => {
  const id = req.params.id
  const body = req.body
  const result = await salaryStructureService.update(id, body)
  if (result.modifiedCount === 0) {
    return res.status(404).json({
      message: SALARY_STRUCTURE_MESSAGE.SALARY_STRUCTURE_NOT_FOUND
    })
  }
  return res.status(200).json({
    message: SALARY_STRUCTURE_MESSAGE.SALARY_STRUCTURE_UPDATE_SUCCESS
  })
}
export const ApiDeleteController = async (req: Request<any, any, any, any>, res: Response) => {
  const { ids } = req.body
  console.log(ids)

  const deletedCount = await salaryStructureService.deleteSalaries(ids)

  if (deletedCount > 0) {
    return res
      .status(HTTP_STATUS.OK)
      .json({ message: SALARY_STRUCTURE_MESSAGE.SALARY_STRUCTURE_DELETE_SUCCESS, deletedCount })
  } else {
    return res.status(HTTP_STATUS.NOT_FOUND).json({ message: SALARY_STRUCTURE_MESSAGE.SALARY_STRUCTURE_NOT_FOUND })
  }
}
