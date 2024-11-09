import { MongoClient, ObjectId } from 'mongodb'

interface RoleType {
  _id?: ObjectId
  title: string
  description: string
  permission?: string[]
  deleted?: boolean
  deletedAt?: Date
  createdAt?: Date
  updatedAt?: Date
}

class Role {
  _id?: ObjectId
  title: string
  description: string
  permission: string[]
  deleted: boolean
  deletedAt?: Date
  createdAt: Date
  updatedAt: Date

  constructor(role: RoleType) {
    this._id = role._id
    this.title = role.title
    this.description = role.description
    this.permission = role.permission || []
    this.deleted = role.deleted || false
    this.deletedAt = role.deletedAt
    this.createdAt = role.createdAt || new Date()
    this.updatedAt = role.updatedAt || new Date()
  }
}

export default Role
