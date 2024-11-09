export interface RoleRequestBody {
  title: string
  description: string
}
export interface RoleTitleExistsRequestBody {
  title: string
}
export interface EditRolesRequestParams {
  id: string
}
export interface Permission {
  id: string
  permissions: string[]
}

export interface PermissionsData {
  permissions: Permission[]
}
