import { ObjectId } from 'mongodb'
import { salaryType } from '~/constants/enums'
export interface SalaryPortionType {
  _id?: ObjectId
  ten: string
  loai: salaryType
  mo_ta?: string
  is_active: boolean
  tai_khoan_ke_toan: Array<{
    id_congty: ObjectId
    id_ke_toan: ObjectId
    ten_tai_khoan?: string
    ten_cong_ty?: string
  }>
  deleted?: boolean
  ngay_tao?: Date
}

export default class SalaryPortion {
  _id?: ObjectId
  ten: string
  loai: salaryType
  mo_ta?: string
  is_active: boolean
  tai_khoan_ke_toan: Array<{
    id_congty: ObjectId
    id_ke_toan: ObjectId
    ten_tai_khoan?: string
    ten_cong_ty?: string
  }>
  deleted: boolean
  ngay_tao: Date

  constructor(portion: SalaryPortionType) {
    this._id = portion._id
    this.ten = portion.ten
    this.ngay_tao = portion.ngay_tao || new Date()
    this.loai = portion.loai
    this.mo_ta = portion.mo_ta
    this.is_active = portion.is_active
    this.tai_khoan_ke_toan = portion.tai_khoan_ke_toan
    this.deleted = portion.deleted || false
  }
}
