"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_service_1 = __importDefault(require("~/services/database.service"));
const mongodb_1 = require("mongodb");
const parseBoolean_1 = __importDefault(require("~/utils/parseBoolean"));
const salary_model_1 = __importDefault(require("~/models/schemas/salary.model"));
class SalaryService {
    SalaryEdit(ten, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield database_service_1.default.SalaryPortion.findOne({
                ten: ten,
                _id: { $ne: new mongodb_1.ObjectId(id) }
            });
            if (result) {
                return true;
            }
            return false;
        });
    }
    SalaryCreate(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield database_service_1.default.SalaryPortion.findOne({ ten: name });
            if (result) {
                return true;
            }
            return false;
        });
    }
    filterSalaries(body, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            const { filters, name, salaryType, salaryincreaseordecrease, filterSelect, pages } = body;
            console.log(body);
            // Cấu trúc điều kiện lọc từ filters
            const filterConditions = {};
            if (filters && Array.isArray(filters)) {
                filters.forEach((filter) => {
                    const { field, operator, value } = filter;
                    // Xử lý trường hợp đặc biệt cho ObjectId
                    if (field === '_id') {
                        switch (operator) {
                            case '=':
                                filterConditions[field] = new mongodb_1.ObjectId(value);
                                break;
                            case '<':
                                filterConditions[field] = { $lt: new mongodb_1.ObjectId(value) };
                                break;
                            case '>':
                                filterConditions[field] = { $gt: new mongodb_1.ObjectId(value) };
                                break;
                            default:
                                break;
                        }
                        return; // Thoát khỏi vòng lặp
                    }
                    // Xử lý các trường hợp khác
                    if (field === 'is_active') {
                        filterConditions[field] = (0, parseBoolean_1.default)(value);
                        return; // Thoát khỏi vòng lặp
                    }
                    if (field === 'loai') {
                        filterConditions[field] = parseInt(value, 10);
                        return; // Thoát khỏi vòng lặp
                    }
                    if (field === 'ngay_tao') {
                        switch (operator) {
                            case '=':
                                filterConditions[field] = new Date(value);
                                break;
                            case '<':
                                filterConditions[field] = { $lt: new Date(value) };
                                break;
                            case '>':
                                filterConditions[field] = { $gt: new Date(value) };
                                break;
                            default:
                                break;
                        }
                        return;
                    }
                    // Xử lý các toán tử so sánh khác
                    switch (operator) {
                        case '=':
                            filterConditions[field] = value;
                            break;
                        case '<':
                            filterConditions[field] = { $lt: value };
                            break;
                        case '>':
                            filterConditions[field] = { $gt: value };
                            break;
                        default:
                            break;
                    }
                });
            }
            // Thêm điều kiện lọc nếu có
            if (name) {
                filterConditions.ten = { $regex: new RegExp(name.trim(), 'i') }; // Lọc theo tên, không phân biệt hoa thường
            }
            if (salaryType) {
                filterConditions.loai = parseInt(salaryType, 10);
            }
            // Giới hạn số bản ghi trên mỗi trang
            const currentPage = Math.max(pages || 1, 1); // Đảm bảo pages ít nhất là 1
            const skip = (currentPage - 1) * limit;
            // Đếm tổng số bản ghi
            const countDocuments = yield database_service_1.default.SalaryPortion.countDocuments(filterConditions);
            const totalPages = Math.ceil(countDocuments / limit);
            // Nếu pages vượt quá tổng số trang, thiết lập lại pages về trang cuối cùng
            const validPage = Math.min(currentPage, totalPages === 0 ? 1 : totalPages);
            // Lấy dữ liệu từ database theo các điều kiện đã lọc và phân trang
            filterConditions.deleted = false;
            console.log(filterConditions);
            const results = yield database_service_1.default.SalaryPortion.find(filterConditions)
                .sort({ [filterSelect]: salaryincreaseordecrease === 'arrow_increase' ? 1 : -1 }) // Sắp xếp tăng/giảm
                .skip(skip)
                .limit(limit)
                .toArray();
            return {
                data: results,
                totalDocuments: countDocuments,
                currentPage: validPage,
                totalPages: totalPages
            };
        });
    }
    deleteSalaries(ids) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!ids || ids.length === 0) {
                throw new Error('Không có ID nào được gửi để xóa.');
            }
            const objectIds = ids.map((id) => new mongodb_1.ObjectId(id));
            // Thực hiện xóa các mục trong cơ sở dữ liệu
            const result = yield database_service_1.default.SalaryPortion.deleteMany({ _id: { $in: objectIds } });
            return result.deletedCount;
        });
    }
    createSalary(data) {
        return __awaiter(this, void 0, void 0, function* () {
            // Chuyển đổi `tai_khoan_ke_toan` thành ObjectId
            const transformedAccounts = data.tai_khoan_ke_toan.map((account) => ({
                id_congty: new mongodb_1.ObjectId(account.id_congty), // Chuyển đổi id_congty thành ObjectId
                id_ke_toan: new mongodb_1.ObjectId(account.id_ke_toan) // Chuyển đổi id_ke_toan thành ObjectId
            }));
            // Tạo một đối tượng mới để lưu vào cơ sở dữ liệu
            const newSalary = new salary_model_1.default({
                ten: data.ten,
                loai: data.loai,
                mo_ta: data.mo_ta,
                is_active: data.is_active,
                tai_khoan_ke_toan: transformedAccounts
            });
            // Lưu đối tượng vào cơ sở dữ liệu
            const result = yield database_service_1.default.SalaryPortion.insertOne(newSalary);
            return result;
        });
    }
    updateSalary(salaryId, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const transformedAccounts = data.tai_khoan_ke_toan.map((account) => ({
                id_congty: new mongodb_1.ObjectId(account.id_congty),
                id_ke_toan: new mongodb_1.ObjectId(account.id_ke_toan)
            }));
            // Tạo đối tượng cập nhật
            const updatedSalary = {
                ten: data.ten,
                loai: data.loai,
                mo_ta: data.mo_ta,
                is_active: data.is_active,
                tai_khoan_ke_toan: transformedAccounts
            };
            // Thực hiện cập nhật vào cơ sở dữ liệu
            const result = yield database_service_1.default.SalaryPortion.updateOne({ _id: new mongodb_1.ObjectId(salaryId) }, { $set: updatedSalary });
            return result;
        });
    }
}
const salaryService = new SalaryService();
exports.default = salaryService;
