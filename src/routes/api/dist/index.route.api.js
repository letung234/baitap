"use strict";
exports.__esModule = true;
var salary_route_api_1 = require("./salary.route.api");
var upload_routes_api_1 = require("./upload.routes.api");
var role_routes_api_1 = require("./role.routes.api");
var user_routes_api_1 = require("./user.routes.api");
var salaryStructure_routes_api_1 = require("./salaryStructure.routes.api");
var ApiRoutes = function (app) {
    app.use("/api/salary", salary_route_api_1["default"]);
    app.use("/api/upload", upload_routes_api_1["default"]);
    app.use("/api/role", role_routes_api_1["default"]);
    app.use('/api/users', user_routes_api_1["default"]);
    app.use('/api/salaryStructure', salaryStructure_routes_api_1["default"]);
};
exports["default"] = ApiRoutes;
