"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.permissionsPatch = exports.ApiRoleDeleteController = exports.ApiRoleEditController = exports.ApiRoleCreateController = void 0;
const role_services_1 = __importDefault(require("../../services/role.services"));
const httpStatus_1 = __importDefault(require("../../constants/httpStatus"));
const messages_1 = require("../../constants/messages");
const ApiRoleCreateController = async (req, res) => {
    const { title, description } = req.body;
    await role_services_1.default.createRole({
        title,
        description
    });
    return res.status(httpStatus_1.default.CREATED).json({
        message: messages_1.ROLE_MESSAGES.ROLE_ADD_SUCCESS
    });
};
exports.ApiRoleCreateController = ApiRoleCreateController;
const ApiRoleEditController = async (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;
    await role_services_1.default.updateRole(id, {
        title,
        description
    });
    return res.status(httpStatus_1.default.OK).json({
        message: messages_1.ROLE_MESSAGES.ROLE_UPDATE_SUCCESS
    });
};
exports.ApiRoleEditController = ApiRoleEditController;
const ApiRoleDeleteController = async (req, res) => {
    const { id } = req.params;
    const result = await role_services_1.default.deleteRole(id);
    return res.status(httpStatus_1.default.OK).json(result);
};
exports.ApiRoleDeleteController = ApiRoleDeleteController;
const permissionsPatch = async (req, res) => {
    const permissions = req.body.permissions;
    await role_services_1.default.patchPermissions(permissions);
    return res.status(httpStatus_1.default.OK).json({ success: true });
};
exports.permissionsPatch = permissionsPatch;
