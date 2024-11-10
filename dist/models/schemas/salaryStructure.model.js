"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SalaryStructure {
    _id;
    ten;
    id_cong_ty;
    status;
    chu_ky_phat_luong;
    don_vi_tien_te;
    thu_nhap;
    khau_tru;
    hinh_thuc_chi_tra;
    deleted;
    created_at;
    updated_at;
    constructor(structure) {
        this._id = structure._id;
        this.ten = structure.ten;
        this.id_cong_ty = structure.id_cong_ty;
        this.status = structure.status;
        this.chu_ky_phat_luong = structure.chu_ky_phat_luong;
        this.don_vi_tien_te = structure.don_vi_tien_te;
        this.thu_nhap = structure.thu_nhap;
        this.khau_tru = structure.khau_tru;
        this.hinh_thuc_chi_tra = structure.hinh_thuc_chi_tra;
        this.deleted = structure.deleted || false;
        this.created_at = structure.created_at || new Date();
        this.updated_at = structure.updated_at || new Date();
    }
}
exports.default = SalaryStructure;
