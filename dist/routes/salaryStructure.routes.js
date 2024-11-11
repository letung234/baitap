"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const salaryStructure_controllers_1 = require("../controllers/salaryStructure.controllers");
const handler_1 = require("../utils/handler");
const authenticateToken_1 = __importDefault(require("../middlewares/authenticateToken"));
const SalaryStructureRouter = (0, express_1.Router)();
SalaryStructureRouter.use(authenticateToken_1.default);
SalaryStructureRouter.get('/', (0, handler_1.wrapRequestHandler)(salaryStructure_controllers_1.GetIndexController));
SalaryStructureRouter.get('/create', (0, handler_1.wrapRequestHandler)(salaryStructure_controllers_1.GetCreateController));
SalaryStructureRouter.get('/edit/:id', (0, handler_1.wrapRequestHandler)(salaryStructure_controllers_1.GetEditController));
exports.default = SalaryStructureRouter;
