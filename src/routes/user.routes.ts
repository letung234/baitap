import { Router, Request, Response } from 'express'
import {
  GetLoginController,
  GetUserController,
  CreateUserController,
  EditUserController
} from '~/controllers/user.controllers'
import { wrapRequestHandler } from '~/utils/handler'
import authenticateToken from '~/middlewares/authenticateToken'
const UserRouter = Router()
UserRouter.get('/login', wrapRequestHandler(GetLoginController))
UserRouter.get('/', authenticateToken, wrapRequestHandler(GetUserController))
UserRouter.get('/create', authenticateToken, wrapRequestHandler(CreateUserController))
UserRouter.get('/edit/:id', authenticateToken, wrapRequestHandler(EditUserController))
export default UserRouter
