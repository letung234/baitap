import { ObjectId } from 'mongodb'

// Interface cho bảng taiKhoanChiTra
export interface TaiKhoanChiTraType {
  _id?: ObjectId
  ten: string
}

// Lớp TaiKhoanChiTra
export default class PayMentAccount {
  _id?: ObjectId
  ten: string

  constructor(taiKhoanChiTra: TaiKhoanChiTraType) {
    this._id = taiKhoanChiTra._id
    this.ten = taiKhoanChiTra.ten
  }
}
