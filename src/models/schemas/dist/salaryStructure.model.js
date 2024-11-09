"use strict";
exports.__esModule = true;
var SalaryStructure = /** @class */ (function () {
    function SalaryStructure(structure) {
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
    return SalaryStructure;
}());
exports["default"] = SalaryStructure;
