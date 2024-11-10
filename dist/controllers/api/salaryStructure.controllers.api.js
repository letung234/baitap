"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiDeleteController = exports.ApiEiditController = exports.ApiFilterController = exports.ApiCreateController = void 0;
const salaryStructure_services_1 = __importDefault(require("../../services/salaryStructure.services"));
const httpStatus_1 = __importDefault(require("../../constants/httpStatus"));
const messages_1 = require("../../constants/messages");
const dir_1 = require("../../constants/dir");
const ApiCreateController = async (req, res) => {
    const data = req.body;
    await salaryStructure_services_1.default.create(data);
    return res.status(httpStatus_1.default.CREATED).json({ success: true });
};
exports.ApiCreateController = ApiCreateController;
const ApiFilterController = async (req, res) => {
    const limit = dir_1.limmit;
    const result = await salaryStructure_services_1.default.filterSalaries(req.body, limit);
    res.status(200).json(result);
};
exports.ApiFilterController = ApiFilterController;
const ApiEiditController = async (req, res) => {
    const id = req.params.id;
    const body = req.body;
    const result = await salaryStructure_services_1.default.update(id, body);
    if (result.modifiedCount === 0) {
        return res.status(404).json({
            message: messages_1.SALARY_STRUCTURE_MESSAGE.SALARY_STRUCTURE_NOT_FOUND
        });
    }
    return res.status(200).json({
        message: messages_1.SALARY_STRUCTURE_MESSAGE.SALARY_STRUCTURE_UPDATE_SUCCESS
    });
};
exports.ApiEiditController = ApiEiditController;
const ApiDeleteController = async (req, res) => {
    const { ids } = req.body;
    console.log(ids);
    const deletedCount = await salaryStructure_services_1.default.deleteSalaries(ids);
    if (deletedCount > 0) {
        return res
            .status(httpStatus_1.default.OK)
            .json({ message: messages_1.SALARY_STRUCTURE_MESSAGE.SALARY_STRUCTURE_DELETE_SUCCESS, deletedCount });
    }
    else {
        return res.status(httpStatus_1.default.NOT_FOUND).json({ message: messages_1.SALARY_STRUCTURE_MESSAGE.SALARY_STRUCTURE_NOT_FOUND });
    }
};
exports.ApiDeleteController = ApiDeleteController;
