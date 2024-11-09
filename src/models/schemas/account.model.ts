import { ObjectId } from 'mongodb'

export interface AccountType {
  _id?: ObjectId
  ten: string
}

export default class Account {
  _id?: ObjectId
  ten: string

  constructor(company: AccountType) {
    this._id = company._id || new ObjectId()
    this.ten = company.ten
  }
}
