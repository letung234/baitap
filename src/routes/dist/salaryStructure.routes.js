"use strict";
exports.__esModule = true;
var express_1 = require("express");
var salaryStructure_controllers_1 = require("~/controllers/salaryStructure.controllers");
var handler_1 = require("~/utils/handler");
var authenticateToken_1 = require("~/middlewares/authenticateToken");
var SalaryStructureRouter = express_1.Router();
SalaryStructureRouter.use(authenticateToken_1["default"]);
SalaryStructureRouter.get('/', handler_1.wrapRequestHandler(salaryStructure_controllers_1.GetIndexController));
SalaryStructureRouter.get('/create', handler_1.wrapRequestHandler(salaryStructure_controllers_1.GetCreateController));
SalaryStructureRouter.get('/edit/:id', handler_1.wrapRequestHandler(salaryStructure_controllers_1.GetEditController));
// SalaryStructureRouter.get('/edit/:id', wrapRequestHandler(GetEditController))
exports["default"] = SalaryStructureRouter;
