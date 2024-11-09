"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeteditSalaryController = exports.GetCreateSalaryController = exports.GetSalaryController = void 0;
const database_service_1 = __importDefault(require("../services/database.service"));
const dir_1 = require("../constants/dir");
const enums_1 = require("../constants/enums");
const mongodb_1 = require("mongodb");
// [GET] /Salary
const GetSalaryController = async (req, res) => {
    const countProducts = await database_service_1.default.SalaryPortion.countDocuments({ deleted: false });
    const filterId = await database_service_1.default.SalaryPortion.find({ deleted: false }).project({ _id: 1, ten: 1 }).toArray();
    const filter_by = [
        {
            name: '_id',
            operators: ['>', '<', '='],
            selections: filterId.map((item) => ({ value: item._id, ten: item.ten }))
        },
        {
            name: 'ten',
            operators: ['>', '<', '=']
        },
        {
            name: 'loai',
            operators: ['='],
            selections: [
                { value: enums_1.salaryType.KhauTru, ten: 'Khấu trừ' },
                { value: enums_1.salaryType.ThuNhap, ten: 'Thu Nhập' }
            ]
        },
        {
            name: 'mo_ta',
            operators: ['>', '<', '=']
        },
        {
            name: 'is_active',
            operators: ['='],
            selections: [
                { value: true, ten: 'Đã Bật' },
                { value: false, ten: 'Vô Hiệu Hóa' }
            ]
        },
        {
            name: 'ngay_tao',
            operators: ['>', '<', '=']
        }
    ];
    const salary = await database_service_1.default.SalaryPortion.find({ deleted: false }).limit(dir_1.limmit).toArray();
    res.render('pages/salary/index', {
        pageTitle: 'Phân Lương',
        salary,
        countProducts,
        limit: dir_1.limmit,
        filter_by
    });
};
exports.GetSalaryController = GetSalaryController;
// [GET] /Salary/create
const GetCreateSalaryController = async (req, res) => {
    const Account = await database_service_1.default.Account.find({}).toArray();
    const Company = await database_service_1.default.Company.find({}).toArray();
    res.render('pages/salary/create', {
        pageTitle: 'Thêm Mới Phân Lương',
        Account,
        Company
    });
};
exports.GetCreateSalaryController = GetCreateSalaryController;
// [GET] /Salary/edit/:id
const GeteditSalaryController = async (req, res) => {
    const salaryId = req.params.id;
    const salary = await database_service_1.default.SalaryPortion.findOne({ _id: new mongodb_1.ObjectId(salaryId) });
    const accounts = await database_service_1.default.Account.find({}).toArray();
    const companies = await database_service_1.default.Company.find({}).toArray();
    if (salary) {
        res.render('pages/salary/edit', {
            pageTitle: 'Chỉnh Sửa Phân Lương',
            Salary: salary,
            Account: accounts,
            Company: companies
        });
    }
    else {
        res.render('page/error/404');
    }
};
exports.GeteditSalaryController = GeteditSalaryController;
