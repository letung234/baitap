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
exports.permissionsPatch = exports.ApiRoleDeleteController = exports.ApiRoleEditController = exports.ApiRoleCreateController = void 0;
const role_services_1 = __importDefault(require("~/services/role.services"));
const httpStatus_1 = __importDefault(require("~/constants/httpStatus"));
const messages_1 = require("~/constants/messages");
const ApiRoleCreateController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description } = req.body;
    yield role_services_1.default.createRole({
        title,
        description
    });
    return res.status(httpStatus_1.default.CREATED).json({
        message: messages_1.ROLE_MESSAGES.ROLE_ADD_SUCCESS
    });
});
exports.ApiRoleCreateController = ApiRoleCreateController;
const ApiRoleEditController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { title, description } = req.body;
    yield role_services_1.default.updateRole(id, {
        title,
        description
    });
    return res.status(httpStatus_1.default.OK).json({
        message: messages_1.ROLE_MESSAGES.ROLE_UPDATE_SUCCESS
    });
});
exports.ApiRoleEditController = ApiRoleEditController;
const ApiRoleDeleteController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield role_services_1.default.deleteRole(id);
    return res.status(httpStatus_1.default.OK).json(result);
});
exports.ApiRoleDeleteController = ApiRoleDeleteController;
const permissionsPatch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const permissions = req.body.permissions;
    yield role_services_1.default.patchPermissions(permissions);
    return res.status(httpStatus_1.default.OK).json({ success: true });
});
exports.permissionsPatch = permissionsPatch;
