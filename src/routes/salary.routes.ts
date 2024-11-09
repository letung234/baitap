import { Router, Request, Response } from 'express'
import {
  GetSalaryController,
  GetCreateSalaryController,
  GeteditSalaryController
} from '~/controllers/salary.controllers'
import { wrapRequestHandler } from '~/utils/handler'
import authenticateToken from '~/middlewares/authenticateToken'
const SalaryRouter = Router()
SalaryRouter.use(authenticateToken)
SalaryRouter.get('/', wrapRequestHandler(GetSalaryController))
SalaryRouter.get('/create', wrapRequestHandler(GetCreateSalaryController))
SalaryRouter.get('/edit/:id', wrapRequestHandler(GeteditSalaryController))
export default SalaryRouter
