import { ObjectId } from 'mongodb'

export interface CompanyType {
  _id?: ObjectId
  ten: string
}

export default class Company {
  _id?: ObjectId
  ten: string

  constructor(company: CompanyType) {
    this._id = company._id || new ObjectId()
    this.ten = company.ten
  }
}
