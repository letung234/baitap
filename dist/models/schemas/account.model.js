"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
class Account {
    _id;
    ten;
    constructor(company) {
        this._id = company._id || new mongodb_1.ObjectId();
        this.ten = company.ten;
    }
}
exports.default = Account;
