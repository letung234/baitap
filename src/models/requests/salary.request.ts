import { ObjectId } from 'mongodb'
import { salaryType } from '~/constants/enums'
export interface salaryKeywords {
  _id?: ObjectId
  ten?: string
  loai?: salaryType
  mo_ta?: string
  is_active?: boolean
  ngay_tao: Date
}

export type SortKey = 'ten' | 'loai' | 'mo_ta' | 'ngay_tao'

export type SortValue = 'asc' | 'desc'
export interface salaryQuery {
  keywords?: string
  sortKey?: SortKey
  sortValue?: SortValue
  page?: number
}
export interface SalaryNameExistsRequestBody {
  ten: string
}
export interface EditSalaryNameExistsParams {
  id: string
}
type SalaryIncreaseOrDecrease = 'arrow_increase' | 'arrow_decrease'

// Định nghĩa kiểu cho request body
export interface SalaryFilterRequestBody {
  filters?: {
    field: string
    operator: string
    value: string
  }[]
  name?: string
  salaryType?: string
  salaryincreaseordecrease?: SalaryIncreaseOrDecrease
  filterSelect?: string
  pages?: number
}

export interface DeleteSalaryRequestBody {
  ids: string[]
}
export interface SalaryCreateData {
  ten: string
  loai: number
  mo_ta?: string
  is_active: boolean
  tai_khoan_ke_toan: { id_congty: string; id_ke_toan: string }[]
}
export interface SalaryUpdateData {
  ten: string
  loai: number
  mo_ta?: string
  is_active: boolean
  tai_khoan_ke_toan: { id_congty: string; id_ke_toan: string }[]
}
