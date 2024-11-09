"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const salary_routes_1 = __importDefault(require("./salary.routes"));
const user_routes_1 = __importDefault(require("./user.routes"));
const role_routes_1 = __importDefault(require("./role.routes"));
const salaryStructure_routes_1 = __importDefault(require("./salaryStructure.routes"));
const Routes = (app) => {
    app.use(`/salary`, salary_routes_1.default);
    app.use('/users', user_routes_1.default);
    app.use('/role', role_routes_1.default);
    app.use('/salaryStructure', salaryStructure_routes_1.default);
};
exports.default = Routes;
