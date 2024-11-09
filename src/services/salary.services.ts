import databaseService from '~/services/database.service'
import { ObjectId } from 'mongodb'
import { SalaryFilterRequestBody, SalaryCreateData, SalaryUpdateData } from '~/models/requests/salary.request'
import parseBoolean from '~/utils/parseBoolean'
import SalaryPortion from '~/models/schemas/salary.model'
class SalaryService {
  async SalaryEdit(ten: string, id: string) {
    const result = await databaseService.SalaryPortion.findOne({
      ten: ten,
      _id: { $ne: new ObjectId(id) }
    })
    if (result) {
      return true
    }

    return false
  }
  async SalaryCreate(name: string) {
    const result = await databaseService.SalaryPortion.findOne({ ten: name })
    if (result) {
      return true
    }
    return false
  }
  async filterSalaries(body: SalaryFilterRequestBody, limit: number) {
    const { filters, name, salaryType, salaryincreaseordecrease, filterSelect, pages } = body
    console.log(body)
    // Cấu trúc điều kiện lọc từ filters
    const filterConditions: Record<string, any> = {}

    if (filters && Array.isArray(filters)) {
      filters.forEach((filter) => {
        const { field, operator, value } = filter

        // Xử lý trường hợp đặc biệt cho ObjectId
        if (field === '_id') {
          switch (operator) {
            case '=':
              filterConditions[field] = new ObjectId(value)
              break
            case '<':
              filterConditions[field] = { $lt: new ObjectId(value) }
              break
            case '>':
              filterConditions[field] = { $gt: new ObjectId(value) }
              break
            default:
              break
          }
          return // Thoát khỏi vòng lặp
        }

        // Xử lý các trường hợp khác
        if (field === 'is_active') {
          filterConditions[field] = parseBoolean(value)
          return // Thoát khỏi vòng lặp
        }

        if (field === 'loai') {
          filterConditions[field] = parseInt(value, 10)
          return // Thoát khỏi vòng lặp
        }

        if (field === 'ngay_tao') {
          switch (operator) {
            case '=':
              filterConditions[field] = new Date(value)
              break
            case '<':
              filterConditions[field] = { $lt: new Date(value) }
              break
            case '>':
              filterConditions[field] = { $gt: new Date(value) }
              break
            default:
              break
          }
          return
        }

        // Xử lý các toán tử so sánh khác
        switch (operator) {
          case '=':
            filterConditions[field] = value
            break
          case '<':
            filterConditions[field] = { $lt: value }
            break
          case '>':
            filterConditions[field] = { $gt: value }
            break
          default:
            break
        }
      })
    }

    // Thêm điều kiện lọc nếu có
    if (name) {
      filterConditions.ten = { $regex: new RegExp(name.trim(), 'i') } // Lọc theo tên, không phân biệt hoa thường
    }

    if (salaryType) {
      filterConditions.loai = parseInt(salaryType, 10)
    }

    // Giới hạn số bản ghi trên mỗi trang
    const currentPage = Math.max(pages || 1, 1) // Đảm bảo pages ít nhất là 1
    const skip = (currentPage - 1) * limit

    // Đếm tổng số bản ghi
    const countDocuments = await databaseService.SalaryPortion.countDocuments(filterConditions)
    const totalPages = Math.ceil(countDocuments / limit)

    // Nếu pages vượt quá tổng số trang, thiết lập lại pages về trang cuối cùng
    const validPage = Math.min(currentPage, totalPages === 0 ? 1 : totalPages)

    // Lấy dữ liệu từ database theo các điều kiện đã lọc và phân trang
    filterConditions.deleted = false
    console.log(filterConditions)
    const results = await databaseService.SalaryPortion.find(filterConditions)
      .sort({ [filterSelect as string]: salaryincreaseordecrease === 'arrow_increase' ? 1 : -1 }) // Sắp xếp tăng/giảm
      .skip(skip)
      .limit(limit)
      .toArray()

    return {
      data: results,
      totalDocuments: countDocuments,
      currentPage: validPage,
      totalPages: totalPages
    }
  }
  async deleteSalaries(ids: string[]) {
    if (!ids || ids.length === 0) {
      throw new Error('Không có ID nào được gửi để xóa.')
    }

    const objectIds = ids.map((id) => new ObjectId(id))

    // Thực hiện xóa các mục trong cơ sở dữ liệu
    const result = await databaseService.SalaryPortion.deleteMany({ _id: { $in: objectIds } })

    return result.deletedCount
  }
  async createSalary(data: SalaryCreateData) {
    // Chuyển đổi `tai_khoan_ke_toan` thành ObjectId
    const transformedAccounts = data.tai_khoan_ke_toan.map((account) => ({
      id_congty: new ObjectId(account.id_congty), // Chuyển đổi id_congty thành ObjectId
      id_ke_toan: new ObjectId(account.id_ke_toan) // Chuyển đổi id_ke_toan thành ObjectId
    }))

    // Tạo một đối tượng mới để lưu vào cơ sở dữ liệu
    const newSalary = new SalaryPortion({
      ten: data.ten,
      loai: data.loai,
      mo_ta: data.mo_ta,
      is_active: data.is_active,
      tai_khoan_ke_toan: transformedAccounts
    })

    // Lưu đối tượng vào cơ sở dữ liệu
    const result = await databaseService.SalaryPortion.insertOne(newSalary)

    return result
  }
  async updateSalary(salaryId: string, data: SalaryUpdateData) {
    const transformedAccounts = data.tai_khoan_ke_toan.map((account) => ({
      id_congty: new ObjectId(account.id_congty),
      id_ke_toan: new ObjectId(account.id_ke_toan)
    }))

    // Tạo đối tượng cập nhật
    const updatedSalary = {
      ten: data.ten,
      loai: data.loai,
      mo_ta: data.mo_ta,
      is_active: data.is_active,
      tai_khoan_ke_toan: transformedAccounts
    }

    // Thực hiện cập nhật vào cơ sở dữ liệu
    const result = await databaseService.SalaryPortion.updateOne(
      { _id: new ObjectId(salaryId) },
      { $set: updatedSalary }
    )

    return result
  }
}

const salaryService = new SalaryService()
export default salaryService
