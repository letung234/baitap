"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const role_controllers_1 = require("../controllers/role.controllers");
const handler_1 = require("../utils/handler");
const authenticateToken_1 = __importDefault(require("../middlewares/authenticateToken"));
const RoleRouter = (0, express_1.Router)();
RoleRouter.use(authenticateToken_1.default);
RoleRouter.get('/', (0, handler_1.wrapRequestHandler)(role_controllers_1.GetIndexController));
RoleRouter.get('/create', (0, handler_1.wrapRequestHandler)(role_controllers_1.GetCreateController));
RoleRouter.get('/edit/:id', (0, handler_1.wrapRequestHandler)(role_controllers_1.GetEditController));
RoleRouter.get('/permission', (0, handler_1.wrapRequestHandler)(role_controllers_1.GetPermissionController));
exports.default = RoleRouter;
