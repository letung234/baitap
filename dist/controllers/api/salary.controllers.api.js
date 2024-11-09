"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApieditSalaryFilterController = exports.ApiPostSalaryFilterController = exports.ApiDeleteSalaryFilterController = exports.ApiSalaryFilterController = void 0;
const dir_1 = require("../../constants/dir");
const salary_services_1 = __importDefault(require("../../services/salary.services"));
const httpStatus_1 = __importDefault(require("../../constants/httpStatus"));
const messages_1 = require("../../constants/messages");
// [POST] /api/salary/filter
const ApiSalaryFilterController = async (req, res) => {
    const limit = dir_1.limmit;
    const result = await salary_services_1.default.filterSalaries(req.body, limit);
    res.status(200).json(result);
};
exports.ApiSalaryFilterController = ApiSalaryFilterController;
// [Delete] /api/salary/delete-items
const ApiDeleteSalaryFilterController = async (req, // Sử dụng interface cho body
res) => {
    const { ids } = req.body;
    const deletedCount = await salary_services_1.default.deleteSalaries(ids);
    if (deletedCount > 0) {
        return res.status(httpStatus_1.default.OK).json({ message: messages_1.SALARY_MESSAGES.SALARY_DELETE_SUCCESS, deletedCount });
    }
    else {
        return res.status(httpStatus_1.default.NOT_FOUND).json({ message: messages_1.SALARY_MESSAGES.SALARY_NOT_FOUND });
    }
};
exports.ApiDeleteSalaryFilterController = ApiDeleteSalaryFilterController;
const ApiPostSalaryFilterController = async (req, res) => {
    const { ten, loai, mo_ta, is_active, tai_khoan_ke_toan } = req.body;
    // Gọi hàm createSalary từ service để xử lý logic
    await salary_services_1.default.createSalary({ ten, loai, mo_ta, is_active, tai_khoan_ke_toan });
    // Trả về phản hồi thành công
    return res.status(201).json({
        message: messages_1.SALARY_MESSAGES.SALARY_ADD_SUCCESS // Sử dụng thông điệp từ SALARY_MESSAGES
    });
};
exports.ApiPostSalaryFilterController = ApiPostSalaryFilterController;
const ApieditSalaryFilterController = async (req, res) => {
    const salaryId = req.params.id;
    const { ten, loai, mo_ta, is_active, tai_khoan_ke_toan } = req.body;
    const result = await salary_services_1.default.updateSalary(salaryId, { ten, loai, mo_ta, is_active, tai_khoan_ke_toan });
    if (result.modifiedCount === 0) {
        return res.status(404).json({
            message: messages_1.SALARY_MESSAGES.SALARY_NOT_FOUND
        });
    }
    return res.status(200).json({
        message: messages_1.SALARY_MESSAGES.SALARY_UPDATE_SUCCESS
    });
};
exports.ApieditSalaryFilterController = ApieditSalaryFilterController;
