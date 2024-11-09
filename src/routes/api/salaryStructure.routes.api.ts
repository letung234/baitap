import { Router, Request, Response } from 'express'
import { wrapRequestHandler } from '~/utils/handler'
import {
  ApiCreateController,
  ApiFilterController,
  ApiEiditController,
  ApiDeleteController
} from '~/controllers/api/salaryStructure.controllers.api'
import normalizeDataMiddleware from '~/middlewares/salaryStructureTransform.middleware'
import { createSalaryStructureValidator, updateSalaryStructureValidator } from '~/middlewares/validates.middlewares'
import authenticateToken from '~/middlewares/authenticateToken'
const ApisalaryStructureRouter = Router()
ApisalaryStructureRouter.use(authenticateToken)
ApisalaryStructureRouter.post(
  '/create',
  normalizeDataMiddleware,
  createSalaryStructureValidator,
  wrapRequestHandler(ApiCreateController)
)
ApisalaryStructureRouter.post('/filter', wrapRequestHandler(ApiFilterController))
ApisalaryStructureRouter.patch(
  '/edit/:id',
  normalizeDataMiddleware,
  updateSalaryStructureValidator,
  wrapRequestHandler(ApiEiditController)
)
ApisalaryStructureRouter.delete('/delete-items', wrapRequestHandler(ApiDeleteController))
export default ApisalaryStructureRouter
