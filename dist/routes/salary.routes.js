"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const salary_controllers_1 = require("~/controllers/salary.controllers");
const handler_1 = require("~/utils/handler");
const authenticateToken_1 = __importDefault(require("~/middlewares/authenticateToken"));
const SalaryRouter = (0, express_1.Router)();
SalaryRouter.use(authenticateToken_1.default);
SalaryRouter.get('/', (0, handler_1.wrapRequestHandler)(salary_controllers_1.GetSalaryController));
SalaryRouter.get('/create', (0, handler_1.wrapRequestHandler)(salary_controllers_1.GetCreateSalaryController));
SalaryRouter.get('/edit/:id', (0, handler_1.wrapRequestHandler)(salary_controllers_1.GeteditSalaryController));
exports.default = SalaryRouter;
