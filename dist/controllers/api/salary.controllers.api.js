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
exports.ApieditSalaryFilterController = exports.ApiPostSalaryFilterController = exports.ApiDeleteSalaryFilterController = exports.ApiSalaryFilterController = void 0;
const dir_1 = require("../../constants/dir");
const salary_services_1 = __importDefault(require("../../services/salary.services"));
const httpStatus_1 = __importDefault(require("../../constants/httpStatus"));
const messages_1 = require("../../constants/messages");
const ApiSalaryFilterController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const limit = dir_1.limmit;
    const result = yield salary_services_1.default.filterSalaries(req.body, limit);
    res.status(200).json(result);
});
exports.ApiSalaryFilterController = ApiSalaryFilterController;
const ApiDeleteSalaryFilterController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { ids } = req.body;
    const deletedCount = yield salary_services_1.default.deleteSalaries(ids);
    if (deletedCount > 0) {
        return res.status(httpStatus_1.default.OK).json({ message: messages_1.SALARY_MESSAGES.SALARY_DELETE_SUCCESS, deletedCount });
    }
    else {
        return res.status(httpStatus_1.default.NOT_FOUND).json({ message: messages_1.SALARY_MESSAGES.SALARY_NOT_FOUND });
    }
});
exports.ApiDeleteSalaryFilterController = ApiDeleteSalaryFilterController;
const ApiPostSalaryFilterController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { ten, loai, mo_ta, is_active, tai_khoan_ke_toan } = req.body;
    yield salary_services_1.default.createSalary({ ten, loai, mo_ta, is_active, tai_khoan_ke_toan });
    return res.status(201).json({
        message: messages_1.SALARY_MESSAGES.SALARY_ADD_SUCCESS
    });
});
exports.ApiPostSalaryFilterController = ApiPostSalaryFilterController;
const ApieditSalaryFilterController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const salaryId = req.params.id;
    const { ten, loai, mo_ta, is_active, tai_khoan_ke_toan } = req.body;
    const result = yield salary_services_1.default.updateSalary(salaryId, { ten, loai, mo_ta, is_active, tai_khoan_ke_toan });
    if (result.modifiedCount === 0) {
        return res.status(404).json({
            message: messages_1.SALARY_MESSAGES.SALARY_NOT_FOUND
        });
    }
    return res.status(200).json({
        message: messages_1.SALARY_MESSAGES.SALARY_UPDATE_SUCCESS
    });
});
exports.ApieditSalaryFilterController = ApieditSalaryFilterController;
