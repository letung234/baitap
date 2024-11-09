"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controllers_1 = require("~/controllers/user.controllers");
const handler_1 = require("~/utils/handler");
const authenticateToken_1 = __importDefault(require("~/middlewares/authenticateToken"));
const UserRouter = (0, express_1.Router)();
UserRouter.get('/login', (0, handler_1.wrapRequestHandler)(user_controllers_1.GetLoginController));
UserRouter.get('/', authenticateToken_1.default, (0, handler_1.wrapRequestHandler)(user_controllers_1.GetUserController));
UserRouter.get('/create', authenticateToken_1.default, (0, handler_1.wrapRequestHandler)(user_controllers_1.CreateUserController));
UserRouter.get('/edit/:id', authenticateToken_1.default, (0, handler_1.wrapRequestHandler)(user_controllers_1.EditUserController));
exports.default = UserRouter;
