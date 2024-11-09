"use strict";
exports.__esModule = true;
var mongodb_1 = require("mongodb");
var Account = /** @class */ (function () {
    function Account(company) {
        this._id = company._id || new mongodb_1.ObjectId();
        this.ten = company.ten;
    }
    return Account;
}());
exports["default"] = Account;
