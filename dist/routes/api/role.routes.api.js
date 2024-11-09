"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const handler_1 = require("../../utils/handler");
const role_controllers_api_1 = require("../../controllers/api/role.controllers.api");
const validates_middlewares_1 = require("../../middlewares/validates.middlewares");
const authenticateToken_1 = __importDefault(require("../../middlewares/authenticateToken"));
const ApiRoleRouter = (0, express_1.Router)();
ApiRoleRouter.use(authenticateToken_1.default);
ApiRoleRouter.post('/create', validates_middlewares_1.createRoleValidator, (0, handler_1.wrapRequestHandler)(role_controllers_api_1.ApiRoleCreateController));
ApiRoleRouter.patch('/edit/:id', validates_middlewares_1.editRoleValidator, (0, handler_1.wrapRequestHandler)(role_controllers_api_1.ApiRoleEditController));
ApiRoleRouter.delete('/delete/:id', (0, handler_1.wrapRequestHandler)(role_controllers_api_1.ApiRoleDeleteController));
ApiRoleRouter.patch('/permissions', (0, handler_1.wrapRequestHandler)(role_controllers_api_1.permissionsPatch));
exports.default = ApiRoleRouter;
