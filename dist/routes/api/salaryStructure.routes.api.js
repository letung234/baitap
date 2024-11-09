"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const handler_1 = require("~/utils/handler");
const salaryStructure_controllers_api_1 = require("~/controllers/api/salaryStructure.controllers.api");
const salaryStructureTransform_middleware_1 = __importDefault(require("~/middlewares/salaryStructureTransform.middleware"));
const validates_middlewares_1 = require("~/middlewares/validates.middlewares");
const authenticateToken_1 = __importDefault(require("~/middlewares/authenticateToken"));
const ApisalaryStructureRouter = (0, express_1.Router)();
ApisalaryStructureRouter.use(authenticateToken_1.default);
ApisalaryStructureRouter.post('/create', salaryStructureTransform_middleware_1.default, validates_middlewares_1.createSalaryStructureValidator, (0, handler_1.wrapRequestHandler)(salaryStructure_controllers_api_1.ApiCreateController));
ApisalaryStructureRouter.post('/filter', (0, handler_1.wrapRequestHandler)(salaryStructure_controllers_api_1.ApiFilterController));
ApisalaryStructureRouter.patch('/edit/:id', salaryStructureTransform_middleware_1.default, validates_middlewares_1.updateSalaryStructureValidator, (0, handler_1.wrapRequestHandler)(salaryStructure_controllers_api_1.ApiEiditController));
ApisalaryStructureRouter.delete('/delete-items', (0, handler_1.wrapRequestHandler)(salaryStructure_controllers_api_1.ApiDeleteController));
exports.default = ApisalaryStructureRouter;
