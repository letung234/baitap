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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var database_service_1 = require("~/services/database.service");
var mongodb_1 = require("mongodb");
var salaryStructure_model_1 = require("~/models/schemas/salaryStructure.model");
var parseBoolean_1 = require("~/utils/parseBoolean");
var SalaryStructureService = /** @class */ (function () {
    function SalaryStructureService() {
    }
    SalaryStructureService.prototype.create = function (data) {
        return __awaiter(this, void 0, Promise, function () {
            var normalizedData, createdRecord;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        normalizedData = new salaryStructure_model_1["default"](data);
                        return [4 /*yield*/, database_service_1["default"].SalaryStructure.insertOne(normalizedData)];
                    case 1:
                        createdRecord = _a.sent();
                        return [2 /*return*/, createdRecord];
                }
            });
        });
    };
    SalaryStructureService.prototype.deleteSalaries = function (ids) {
        return __awaiter(this, void 0, void 0, function () {
            var objectIds, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!ids || ids.length === 0) {
                            throw new Error('Không có ID nào được gửi để xóa.');
                        }
                        objectIds = ids.map(function (id) { return new mongodb_1.ObjectId(id); });
                        return [4 /*yield*/, database_service_1["default"].SalaryStructure.deleteMany({ _id: { $in: objectIds } })];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result.deletedCount];
                }
            });
        });
    };
    SalaryStructureService.prototype.update = function (id, data) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, database_service_1["default"].SalaryStructure.updateOne({ _id: new mongodb_1.ObjectId(id) }, { $set: data })];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    SalaryStructureService.prototype.filterSalaries = function (body, limit) {
        return __awaiter(this, void 0, void 0, function () {
            var filters, name, salaryType, salaryincreaseordecrease, filterSelect, pages, filterConditions, currentPage, skip, countDocuments, totalPages, validPage, results;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        filters = body.filters, name = body.name, salaryType = body.salaryType, salaryincreaseordecrease = body.salaryincreaseordecrease, filterSelect = body.filterSelect, pages = body.pages;
                        console.log(body);
                        filterConditions = {};
                        if (filters && Array.isArray(filters)) {
                            filters.forEach(function (filter) {
                                var field = filter.field, operator = filter.operator, value = filter.value;
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
                                if (field === 'status') {
                                    filterConditions[field] = parseBoolean_1["default"](value);
                                    return; // Thoát khỏi vòng lặp
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
                            console.log(salaryType);
                            filterConditions.status = parseBoolean_1["default"](salaryType);
                        }
                        currentPage = Math.max(pages || 1, 1) // Đảm bảo pages ít nhất là 1
                        ;
                        skip = (currentPage - 1) * limit;
                        return [4 /*yield*/, database_service_1["default"].SalaryStructure.countDocuments(filterConditions)];
                    case 1:
                        countDocuments = _b.sent();
                        totalPages = Math.ceil(countDocuments / limit);
                        validPage = Math.min(currentPage, totalPages === 0 ? 1 : totalPages);
                        // Lấy dữ liệu từ database theo các điều kiện đã lọc và phân trang
                        filterConditions.deleted = false;
                        console.log(filterConditions);
                        return [4 /*yield*/, database_service_1["default"].SalaryStructure.find(filterConditions)
                                .sort((_a = {}, _a[filterSelect] = salaryincreaseordecrease === 'arrow_increase' ? 1 : -1, _a)) // Sắp xếp tăng/giảm
                                .skip(skip)
                                .limit(limit)
                                .toArray()];
                    case 2:
                        results = _b.sent();
                        return [2 /*return*/, {
                                data: results,
                                totalDocuments: countDocuments,
                                currentPage: validPage,
                                totalPages: totalPages
                            }];
                }
            });
        });
    };
    return SalaryStructureService;
}());
var salaryStructureService = new SalaryStructureService();
exports["default"] = salaryStructureService;
