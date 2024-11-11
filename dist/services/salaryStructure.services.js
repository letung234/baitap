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
const salaryStructure_model_1 = __importDefault(require("../models/schemas/salaryStructure.model"));
const parseBoolean_1 = __importDefault(require("../utils/parseBoolean"));
class SalaryStructureService {
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const normalizedData = new salaryStructure_model_1.default(data);
            const createdRecord = yield database_service_1.default.SalaryStructure.insertOne(normalizedData);
            return createdRecord;
        });
    }
    deleteSalaries(ids) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!ids || ids.length === 0) {
                throw new Error('Không có ID nào được gửi để xóa.');
            }
            const objectIds = ids.map((id) => new mongodb_1.ObjectId(id));
            const result = yield database_service_1.default.SalaryStructure.deleteMany({ _id: { $in: objectIds } });
            return result.deletedCount;
        });
    }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield database_service_1.default.SalaryStructure.updateOne({ _id: new mongodb_1.ObjectId(id) }, { $set: data });
            return result;
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
                    if (field === 'status') {
                        filterConditions[field] = (0, parseBoolean_1.default)(value);
                        return;
                    }
                    if (field === 'updated_at') {
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
                console.log(salaryType);
                filterConditions.status = (0, parseBoolean_1.default)(salaryType);
            }
            const currentPage = Math.max(pages || 1, 1);
            const skip = (currentPage - 1) * limit;
            const countDocuments = yield database_service_1.default.SalaryStructure.countDocuments(filterConditions);
            const totalPages = Math.ceil(countDocuments / limit);
            const validPage = Math.min(currentPage, totalPages === 0 ? 1 : totalPages);
            filterConditions.deleted = false;
            console.log(filterConditions);
            const results = yield database_service_1.default.SalaryStructure.find(filterConditions)
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
}
const salaryStructureService = new SalaryStructureService();
exports.default = salaryStructureService;
