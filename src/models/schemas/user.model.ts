import { ObjectId } from 'mongodb'

interface UserType {
  _id?: ObjectId
  name: string
  email: string
  role_id: string
  is_active?: boolean
  password: string
  created_at?: Date
  updated_at?: Date
  deleted_at?: Date
  deleted: boolean
}

export default class User {
  _id?: ObjectId
  name: string
  email: string
  role_id: string
  password: string
  is_active: boolean
  created_at: Date
  updated_at: Date
  deleted_at?: Date
  deleted: boolean

  constructor(user: UserType) {
    this._id = user._id
    this.name = user.name
    this.email = user.email
    this.role_id = user.role_id
    this.password = user.password
    this.is_active = user.is_active || false
    this.deleted = user.deleted || false
    this.created_at = user.created_at || new Date()
    this.updated_at = user.updated_at || new Date()
    this.deleted_at = user.deleted_at
  }
}
