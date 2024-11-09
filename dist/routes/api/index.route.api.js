"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const salary_route_api_1 = __importDefault(require("./salary.route.api"));
const upload_routes_api_1 = __importDefault(require("./upload.routes.api"));
const role_routes_api_1 = __importDefault(require("./role.routes.api"));
const user_routes_api_1 = __importDefault(require("./user.routes.api"));
const salaryStructure_routes_api_1 = __importDefault(require("./salaryStructure.routes.api"));
const ApiRoutes = (app) => {
    app.use(`/api/salary`, salary_route_api_1.default);
    app.use(`/api/upload`, upload_routes_api_1.default);
    app.use(`/api/role`, role_routes_api_1.default);
    app.use('/api/users', user_routes_api_1.default);
    app.use('/api/salaryStructure', salaryStructure_routes_api_1.default);
};
exports.default = ApiRoutes;
