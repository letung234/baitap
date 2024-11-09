import { Router, Request, Response } from 'express'
import { GetCreateController, GetIndexController, GetEditController } from '~/controllers/salaryStructure.controllers'
import { wrapRequestHandler } from '~/utils/handler'
import authenticateToken from '~/middlewares/authenticateToken'
const SalaryStructureRouter = Router()

SalaryStructureRouter.use(authenticateToken)
SalaryStructureRouter.get('/', wrapRequestHandler(GetIndexController))
SalaryStructureRouter.get('/create', wrapRequestHandler(GetCreateController))
SalaryStructureRouter.get('/edit/:id', wrapRequestHandler(GetEditController))
// SalaryStructureRouter.get('/edit/:id', wrapRequestHandler(GetEditController))
export default SalaryStructureRouter
