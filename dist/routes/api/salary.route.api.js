"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const handler_1 = require("../../utils/handler");
const salary_controllers_api_1 = require("../../controllers/api/salary.controllers.api");
const validates_middlewares_1 = require("../../middlewares/validates.middlewares");
const ApiSalaryRouter = (0, express_1.Router)();
ApiSalaryRouter.post('/filter', (0, handler_1.wrapRequestHandler)(salary_controllers_api_1.ApiSalaryFilterController));
ApiSalaryRouter.post('/', validates_middlewares_1.createSalaryValidator, (0, handler_1.wrapRequestHandler)(salary_controllers_api_1.ApiPostSalaryFilterController));
ApiSalaryRouter.delete('/delete-items', (0, handler_1.wrapRequestHandler)(salary_controllers_api_1.ApiDeleteSalaryFilterController));
ApiSalaryRouter.patch('/edit/:id', validates_middlewares_1.UpdateSalaryValidator, (0, handler_1.wrapRequestHandler)(salary_controllers_api_1.ApieditSalaryFilterController));
exports.default = ApiSalaryRouter;
