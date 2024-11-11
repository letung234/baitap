"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const normalizeDataMiddleware = (req, res, next) => {
    const data = req.body;
    if (!data) {
        return res.status(400).json({ message: 'No data provided.' });
    }
    try {
        const normalizedData = {
            ten: data.ten,
            id_cong_ty: new mongodb_1.ObjectId(data.id_cong_ty),
            status: data.status === 'true',
            chu_ky_phat_luong: data.chu_ky_phat_luong,
            don_vi_tien_te: data.don_vi_tien_te,
            thu_nhap: data.thu_nhap.map((item) => ({
                id_phan_luong: new mongodb_1.ObjectId(item.itemId1),
                so_tien: Number(item.itemId2)
            })),
            khau_tru: data.khau_tru.map((item) => ({
                id_phan_luong: new mongodb_1.ObjectId(item.itemId1),
                so_tien: Number(item.itemId2)
            })),
            hinh_thuc_chi_tra: {
                id_hinh_thuc: new mongodb_1.ObjectId(data['hinh_thuc_chi_tra[id_hinh_thuc]']),
                id_tai_khoan_chi_tra: new mongodb_1.ObjectId(data['hinh_thuc_chi_tra[id_tai_khoan_chi_tra]'])
            }
        };
        req.body = normalizedData;
        next();
    }
    catch (error) {
        return res.status(500).json({ message: 'Error normalizing data', error: error.message });
    }
};
exports.default = normalizeDataMiddleware;
