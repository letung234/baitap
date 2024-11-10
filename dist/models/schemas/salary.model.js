"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SalaryPortion {
    _id;
    ten;
    loai;
    mo_ta;
    is_active;
    tai_khoan_ke_toan;
    deleted;
    ngay_tao;
    constructor(portion) {
        this._id = portion._id;
        this.ten = portion.ten;
        this.ngay_tao = portion.ngay_tao || new Date();
        this.loai = portion.loai;
        this.mo_ta = portion.mo_ta;
        this.is_active = portion.is_active;
        this.tai_khoan_ke_toan = portion.tai_khoan_ke_toan;
        this.deleted = portion.deleted || false;
    }
}
exports.default = SalaryPortion;
