import databaseService from '~/services/database.service'
import { ObjectId } from 'mongodb'
import Role from '~/models/schemas/role.model'
import { RoleRequestBody } from '~/models/requests/role.request'
class Roleservice {
  async createRole(roleData: RoleRequestBody) {
    const newRole = new Role(roleData)
    const result = await databaseService.Role.insertOne(newRole)
    return result
  }
  async createRoleValidate(name: string) {
    const result = await databaseService.Role.findOne({ title: name, deleted: false })
    if (result) {
      return true
    }
    return false
  }
  async updateRole(id: string, roleData: RoleRequestBody) {
    const result = await databaseService.Role.updateOne({ _id: new ObjectId(id) }, { $set: roleData })
    return result
  }
  async EditRoleValidate(title: string, id: string) {
    const result = await databaseService.Role.findOne({
      title: title,
      deleted: false,
      _id: { $ne: new ObjectId(id) }
    })
    if (result) {
      return true
    }

    return false
  }
  async deleteRole(id: string) {
    const result = await databaseService.Role.updateOne({ _id: new ObjectId(id) }, { $set: { deleted: true } })
    return result
  }
  async patchPermissions(permissions: any) {
    for (const item of permissions) {
      await databaseService.Role.updateOne(
        { _id: new ObjectId(item.id) },
        {
          $set: {
            permission: item.permissions
          }
        }
      )
    }
  }
}
const roleService = new Roleservice()
export default roleService
