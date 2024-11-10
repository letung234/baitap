"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Lớp HinhThuc
class FormOfPayment {
    _id;
    ten;
    constructor(hinhThuc) {
        this._id = hinhThuc._id;
        this.ten = hinhThuc.ten;
    }
}
exports.default = FormOfPayment;
