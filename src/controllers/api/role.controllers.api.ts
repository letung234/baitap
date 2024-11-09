import { Request, Response } from 'express'
import roleService from '~/services/role.services'
import { RoleRequestBody, EditRolesRequestParams, PermissionsData } from '~/models/requests/role.request'
import HTTP_STATUS from '~/constants/httpStatus'
import { ROLE_MESSAGES } from '~/constants/messages'
export const ApiRoleCreateController = async (req: Request<any, any, RoleRequestBody, any>, res: Response) => {
  const { title, description } = req.body
  await roleService.createRole({
    title,
    description
  })
  return res.status(HTTP_STATUS.CREATED).json({
    message: ROLE_MESSAGES.ROLE_ADD_SUCCESS
  })
}
export const ApiRoleEditController = async (
  req: Request<EditRolesRequestParams, any, RoleRequestBody, any>,
  res: Response
) => {
  const { id } = req.params
  const { title, description } = req.body
  await roleService.updateRole(id, {
    title,
    description
  })
  return res.status(HTTP_STATUS.OK).json({
    message: ROLE_MESSAGES.ROLE_UPDATE_SUCCESS
  })
}
export const ApiRoleDeleteController = async (req: Request<EditRolesRequestParams, any, any, any>, res: Response) => {
  const { id } = req.params
  const result = await roleService.deleteRole(id)
  return res.status(HTTP_STATUS.OK).json(result)
}

export const permissionsPatch = async (req: Request<any, any, PermissionsData, any>, res: Response) => {
  const permissions = req.body.permissions
  await roleService.patchPermissions(permissions)
  return res.status(HTTP_STATUS.OK).json({ success: true })
}
