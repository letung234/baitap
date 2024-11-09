import { ObjectId } from 'mongodb'

export interface SalaryStructureType {
  _id?: ObjectId
  ten: string
  id_cong_ty: ObjectId
  status: boolean
  chu_ky_phat_luong: string // Chu kỳ phát lương (ví dụ: "hàng tháng", "hàng quý", ...)
  don_vi_tien_te: string // Đơn vị tiền tệ (ví dụ: "VND", "USD", ...)
  thu_nhap: Array<{
    id_phan_luong: ObjectId // ID của phần lương
    so_tien: number // Số tiền thu nhập
  }>
  khau_tru: Array<{
    id_phan_luong: ObjectId // ID của phần lương cần khấu trừ
    so_tien: number // Số tiền khấu trừ
  }>
  hinh_thuc_chi_tra: {
    id_hinh_thuc: ObjectId // ID của hình thức chi trả
    id_tai_khoan_chi_tra: ObjectId // ID của tài khoản chi trả
  }
  deleted?: boolean
  created_at?: Date
  updated_at?: Date
}

export default class SalaryStructure {
  _id?: ObjectId
  ten: string
  id_cong_ty: ObjectId
  status: boolean
  chu_ky_phat_luong: string
  don_vi_tien_te: string
  thu_nhap: Array<{
    id_phan_luong: ObjectId
    so_tien: number
  }>
  khau_tru: Array<{
    id_phan_luong: ObjectId
    so_tien: number
  }>
  hinh_thuc_chi_tra: {
    id_hinh_thuc: ObjectId
    id_tai_khoan_chi_tra: ObjectId
  }
  deleted: boolean
  created_at: Date
  updated_at: Date

  constructor(structure: SalaryStructureType) {
    this._id = structure._id
    this.ten = structure.ten
    this.id_cong_ty = structure.id_cong_ty
    this.status = structure.status
    this.chu_ky_phat_luong = structure.chu_ky_phat_luong
    this.don_vi_tien_te = structure.don_vi_tien_te
    this.thu_nhap = structure.thu_nhap
    this.khau_tru = structure.khau_tru
    this.hinh_thuc_chi_tra = structure.hinh_thuc_chi_tra
    this.deleted = structure.deleted || false
    this.created_at = structure.created_at || new Date()
    this.updated_at = structure.updated_at || new Date()
  }
}
