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
const database_service_1 = __importDefault(require("../services/database.service"));
const mongodb_1 = require("mongodb");
const parseBoolean_1 = __importDefault(require("../utils/parseBoolean"));
const salary_model_1 = __importDefault(require("../models/schemas/salary.model"));
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
            const filterConditions = {};
            if (filters && Array.isArray(filters)) {
                filters.forEach((filter) => {
                    const { field, operator, value } = filter;
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
                        return;
                    }
                    if (field === 'is_active') {
                        filterConditions[field] = (0, parseBoolean_1.default)(value);
                        return;
                    }
                    if (field === 'loai') {
                        filterConditions[field] = parseInt(value, 10);
                        return;
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
            if (name) {
                filterConditions.ten = { $regex: new RegExp(name.trim(), 'i') };
            }
            if (salaryType) {
                filterConditions.loai = parseInt(salaryType, 10);
            }
            const currentPage = Math.max(pages || 1, 1);
            const skip = (currentPage - 1) * limit;
            const countDocuments = yield database_service_1.default.SalaryPortion.countDocuments(filterConditions);
            const totalPages = Math.ceil(countDocuments / limit);
            const validPage = Math.min(currentPage, totalPages === 0 ? 1 : totalPages);
            filterConditions.deleted = false;
            console.log(filterConditions);
            const results = yield database_service_1.default.SalaryPortion.find(filterConditions)
                .sort({ [filterSelect]: salaryincreaseordecrease === 'arrow_increase' ? 1 : -1 })
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
            const result = yield database_service_1.default.SalaryPortion.deleteMany({ _id: { $in: objectIds } });
            return result.deletedCount;
        });
    }
    createSalary(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const transformedAccounts = data.tai_khoan_ke_toan.map((account) => ({
                id_congty: new mongodb_1.ObjectId(account.id_congty),
                id_ke_toan: new mongodb_1.ObjectId(account.id_ke_toan)
            }));
            const newSalary = new salary_model_1.default({
                ten: data.ten,
                loai: data.loai,
                mo_ta: data.mo_ta,
                is_active: data.is_active,
                tai_khoan_ke_toan: transformedAccounts
            });
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
            const updatedSalary = {
                ten: data.ten,
                loai: data.loai,
                mo_ta: data.mo_ta,
                is_active: data.is_active,
                tai_khoan_ke_toan: transformedAccounts
            };
            const result = yield database_service_1.default.SalaryPortion.updateOne({ _id: new mongodb_1.ObjectId(salaryId) }, { $set: updatedSalary });
            return result;
        });
    }
}
const salaryService = new SalaryService();
exports.default = salaryService;
