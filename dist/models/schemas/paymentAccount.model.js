"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Lớp TaiKhoanChiTra
class PayMentAccount {
    _id;
    ten;
    constructor(taiKhoanChiTra) {
        this._id = taiKhoanChiTra._id;
        this.ten = taiKhoanChiTra.ten;
    }
}
exports.default = PayMentAccount;
