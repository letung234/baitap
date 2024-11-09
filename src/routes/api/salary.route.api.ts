import { Router, Request, Response } from 'express'
import { wrapRequestHandler } from '~/utils/handler'
import {
  ApiSalaryFilterController,
  ApiDeleteSalaryFilterController,
  ApiPostSalaryFilterController,
  ApieditSalaryFilterController
} from '~/controllers/api/salary.controllers.api'
import { createSalaryValidator, UpdateSalaryValidator } from '~/middlewares/validates.middlewares'
const ApiSalaryRouter = Router()
ApiSalaryRouter.post('/filter', wrapRequestHandler(ApiSalaryFilterController))
ApiSalaryRouter.post('/', createSalaryValidator, wrapRequestHandler(ApiPostSalaryFilterController))
ApiSalaryRouter.delete('/delete-items', wrapRequestHandler(ApiDeleteSalaryFilterController))
ApiSalaryRouter.patch('/edit/:id', UpdateSalaryValidator, wrapRequestHandler(ApieditSalaryFilterController))
export default ApiSalaryRouter
