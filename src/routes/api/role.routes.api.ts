import { Router, Request, Response } from 'express'
import { wrapRequestHandler } from '~/utils/handler'
import {
  ApiRoleCreateController,
  ApiRoleEditController,
  ApiRoleDeleteController,
  permissionsPatch
} from '~/controllers/api/role.controllers.api'
import { createRoleValidator, editRoleValidator } from '~/middlewares/validates.middlewares'
import authenticateToken from '~/middlewares/authenticateToken'
const ApiRoleRouter = Router()
ApiRoleRouter.use(authenticateToken)
ApiRoleRouter.post('/create', createRoleValidator, wrapRequestHandler(ApiRoleCreateController))
ApiRoleRouter.patch('/edit/:id', editRoleValidator, wrapRequestHandler(ApiRoleEditController))
ApiRoleRouter.delete('/delete/:id', wrapRequestHandler(ApiRoleDeleteController))
ApiRoleRouter.patch('/permissions', wrapRequestHandler(permissionsPatch))
export default ApiRoleRouter
