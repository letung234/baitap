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
exports.ApieditSalaryFilterController = exports.ApiPostSalaryFilterController = exports.ApiDeleteSalaryFilterController = exports.ApiSalaryFilterController = void 0;
var dir_1 = require("~/constants/dir");
var salary_services_1 = require("~/services/salary.services");
var httpStatus_1 = require("~/constants/httpStatus");
var messages_1 = require("~/constants/messages");
// [POST] /api/salary/filter
exports.ApiSalaryFilterController = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var limit, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                limit = dir_1.limmit;
                return [4 /*yield*/, salary_services_1["default"].filterSalaries(req.body, limit)];
            case 1:
                result = _a.sent();
                res.status(200).json(result);
                return [2 /*return*/];
        }
    });
}); };
// [Delete] /api/salary/delete-items
exports.ApiDeleteSalaryFilterController = function (req, // Sử dụng interface cho body
res) { return __awaiter(void 0, void 0, void 0, function () {
    var ids, deletedCount;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                ids = req.body.ids;
                return [4 /*yield*/, salary_services_1["default"].deleteSalaries(ids)];
            case 1:
                deletedCount = _a.sent();
                if (deletedCount > 0) {
                    return [2 /*return*/, res.status(httpStatus_1["default"].OK).json({ message: messages_1.SALARY_MESSAGES.SALARY_DELETE_SUCCESS, deletedCount: deletedCount })];
                }
                else {
                    return [2 /*return*/, res.status(httpStatus_1["default"].NOT_FOUND).json({ message: messages_1.SALARY_MESSAGES.SALARY_NOT_FOUND })];
                }
                return [2 /*return*/];
        }
    });
}); };
exports.ApiPostSalaryFilterController = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, ten, loai, mo_ta, is_active, tai_khoan_ke_toan;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, ten = _a.ten, loai = _a.loai, mo_ta = _a.mo_ta, is_active = _a.is_active, tai_khoan_ke_toan = _a.tai_khoan_ke_toan;
                // Gọi hàm createSalary từ service để xử lý logic
                return [4 /*yield*/, salary_services_1["default"].createSalary({ ten: ten, loai: loai, mo_ta: mo_ta, is_active: is_active, tai_khoan_ke_toan: tai_khoan_ke_toan })
                    // Trả về phản hồi thành công
                ];
            case 1:
                // Gọi hàm createSalary từ service để xử lý logic
                _b.sent();
                // Trả về phản hồi thành công
                return [2 /*return*/, res.status(201).json({
                        message: messages_1.SALARY_MESSAGES.SALARY_ADD_SUCCESS // Sử dụng thông điệp từ SALARY_MESSAGES
                    })];
        }
    });
}); };
exports.ApieditSalaryFilterController = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var salaryId, _a, ten, loai, mo_ta, is_active, tai_khoan_ke_toan, result;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                salaryId = req.params.id;
                _a = req.body, ten = _a.ten, loai = _a.loai, mo_ta = _a.mo_ta, is_active = _a.is_active, tai_khoan_ke_toan = _a.tai_khoan_ke_toan;
                return [4 /*yield*/, salary_services_1["default"].updateSalary(salaryId, { ten: ten, loai: loai, mo_ta: mo_ta, is_active: is_active, tai_khoan_ke_toan: tai_khoan_ke_toan })];
            case 1:
                result = _b.sent();
                if (result.modifiedCount === 0) {
                    return [2 /*return*/, res.status(404).json({
                            message: messages_1.SALARY_MESSAGES.SALARY_NOT_FOUND
                        })];
                }
                return [2 /*return*/, res.status(200).json({
                        message: messages_1.SALARY_MESSAGES.SALARY_UPDATE_SUCCESS
                    })];
        }
    });
}); };
