import { ObjectId } from 'mongodb'

// Interface cho bảng hinhThuc
export interface HinhThucType {
  _id?: ObjectId
  ten: string
}

// Lớp HinhThuc
export default class FormOfPayment {
  _id?: ObjectId
  ten: string

  constructor(hinhThuc: HinhThucType) {
    this._id = hinhThuc._id
    this.ten = hinhThuc.ten
  }
}
