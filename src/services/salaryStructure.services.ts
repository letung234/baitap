import databaseService from '~/services/database.service'
import { ObjectId } from 'mongodb'
import SalaryStructure from '~/models/schemas/salaryStructure.model'
import { SalaryStructureType } from '~/models/schemas/salaryStructure.model'
import parseBoolean from '~/utils/parseBoolean'
class SalaryStructureService {
  async create(data: any): Promise<any> {
    // Chuẩn hóa dữ liệu trực tiếp trong hàm create
    const normalizedData = new SalaryStructure(data)

    // Sau khi chuẩn hóa, tiếp tục xử lý với dữ liệu chuẩn
    const createdRecord = await databaseService.SalaryStructure.insertOne(normalizedData)
    return createdRecord
  }
  async deleteSalaries(ids: string[]) {
    if (!ids || ids.length === 0) {
      throw new Error('Không có ID nào được gửi để xóa.')
    }

    const objectIds = ids.map((id) => new ObjectId(id))

    // Thực hiện xóa các mục trong cơ sở dữ liệu
    const result = await databaseService.SalaryStructure.deleteMany({ _id: { $in: objectIds } })

    return result.deletedCount
  }
  async update(id: string, data: any) {
    const result = await databaseService.SalaryStructure.updateOne({ _id: new ObjectId(id) }, { $set: data })
    return result
  }
  async filterSalaries(body: any, limit: number) {
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
        if (field === 'status') {
          filterConditions[field] = parseBoolean(value)
          return // Thoát khỏi vòng lặp
        }

        if (field === 'updated_at') {
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
      console.log(salaryType)
      filterConditions.status = parseBoolean(salaryType)
    }

    // Giới hạn số bản ghi trên mỗi trang
    const currentPage = Math.max(pages || 1, 1) // Đảm bảo pages ít nhất là 1
    const skip = (currentPage - 1) * limit

    // Đếm tổng số bản ghi
    const countDocuments = await databaseService.SalaryStructure.countDocuments(filterConditions)
    const totalPages = Math.ceil(countDocuments / limit)

    // Nếu pages vượt quá tổng số trang, thiết lập lại pages về trang cuối cùng
    const validPage = Math.min(currentPage, totalPages === 0 ? 1 : totalPages)

    // Lấy dữ liệu từ database theo các điều kiện đã lọc và phân trang
    filterConditions.deleted = false
    console.log(filterConditions)
    const results = await databaseService.SalaryStructure.find(filterConditions)
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
}
const salaryStructureService = new SalaryStructureService()
export default salaryStructureService
