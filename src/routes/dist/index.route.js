"use strict";
exports.__esModule = true;
var salary_routes_1 = require("./salary.routes");
var user_routes_1 = require("./user.routes");
var role_routes_1 = require("./role.routes");
var salaryStructure_routes_1 = require("./salaryStructure.routes");
var Routes = function (app) {
    app.use("/salary", salary_routes_1["default"]);
    app.use('/users', user_routes_1["default"]);
    app.use('/role', role_routes_1["default"]);
    app.use('/salaryStructure', salaryStructure_routes_1["default"]);
};
exports["default"] = Routes;
