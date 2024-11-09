import { Router, Request, Response } from 'express'
import {
  GetIndexController,
  GetCreateController,
  GetEditController,
  GetPermissionController
} from '~/controllers/role.controllers'
import { wrapRequestHandler } from '~/utils/handler'
import authenticateToken from '~/middlewares/authenticateToken'
const RoleRouter = Router()
RoleRouter.use(authenticateToken)
RoleRouter.get('/', wrapRequestHandler(GetIndexController))
RoleRouter.get('/create', wrapRequestHandler(GetCreateController))
RoleRouter.get('/edit/:id', wrapRequestHandler(GetEditController))
RoleRouter.get('/permission', wrapRequestHandler(GetPermissionController))
export default RoleRouter
