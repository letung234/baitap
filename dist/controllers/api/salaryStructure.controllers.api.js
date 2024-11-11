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
exports.ApiDeleteController = exports.ApiEiditController = exports.ApiFilterController = exports.ApiCreateController = void 0;
const salaryStructure_services_1 = __importDefault(require("../../services/salaryStructure.services"));
const httpStatus_1 = __importDefault(require("../../constants/httpStatus"));
const messages_1 = require("../../constants/messages");
const dir_1 = require("../../constants/dir");
const ApiCreateController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    yield salaryStructure_services_1.default.create(data);
    return res.status(httpStatus_1.default.CREATED).json({ success: true });
});
exports.ApiCreateController = ApiCreateController;
const ApiFilterController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const limit = dir_1.limmit;
    const result = yield salaryStructure_services_1.default.filterSalaries(req.body, limit);
    res.status(200).json(result);
});
exports.ApiFilterController = ApiFilterController;
const ApiEiditController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const body = req.body;
    const result = yield salaryStructure_services_1.default.update(id, body);
    if (result.modifiedCount === 0) {
        return res.status(404).json({
            message: messages_1.SALARY_STRUCTURE_MESSAGE.SALARY_STRUCTURE_NOT_FOUND
        });
    }
    return res.status(200).json({
        message: messages_1.SALARY_STRUCTURE_MESSAGE.SALARY_STRUCTURE_UPDATE_SUCCESS
    });
});
exports.ApiEiditController = ApiEiditController;
const ApiDeleteController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { ids } = req.body;
    console.log(ids);
    const deletedCount = yield salaryStructure_services_1.default.deleteSalaries(ids);
    if (deletedCount > 0) {
        return res
            .status(httpStatus_1.default.OK)
            .json({ message: messages_1.SALARY_STRUCTURE_MESSAGE.SALARY_STRUCTURE_DELETE_SUCCESS, deletedCount });
    }
    else {
        return res.status(httpStatus_1.default.NOT_FOUND).json({ message: messages_1.SALARY_STRUCTURE_MESSAGE.SALARY_STRUCTURE_NOT_FOUND });
    }
});
exports.ApiDeleteController = ApiDeleteController;
