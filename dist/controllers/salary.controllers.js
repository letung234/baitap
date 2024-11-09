"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeteditSalaryController = exports.GetCreateSalaryController = exports.GetSalaryController = void 0;
const database_service_1 = __importDefault(require("~/services/database.service"));
const dir_1 = require("~/constants/dir");
const enums_1 = require("~/constants/enums");
const mongodb_1 = require("mongodb");
// [GET] /Salary
const GetSalaryController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const countProducts = yield database_service_1.default.SalaryPortion.countDocuments({ deleted: false });
    const filterId = yield database_service_1.default.SalaryPortion.find({ deleted: false }).project({ _id: 1, ten: 1 }).toArray();
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
    const salary = yield database_service_1.default.SalaryPortion.find({ deleted: false }).limit(dir_1.limmit).toArray();
    res.render('pages/salary/index', {
        pageTitle: 'Phân Lương',
        salary,
        countProducts,
        limit: dir_1.limmit,
        filter_by
    });
});
exports.GetSalaryController = GetSalaryController;
// [GET] /Salary/create
const GetCreateSalaryController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const Account = yield database_service_1.default.Account.find({}).toArray();
    const Company = yield database_service_1.default.Company.find({}).toArray();
    res.render('pages/salary/create', {
        pageTitle: 'Thêm Mới Phân Lương',
        Account,
        Company
    });
});
exports.GetCreateSalaryController = GetCreateSalaryController;
// [GET] /Salary/edit/:id
const GeteditSalaryController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const salaryId = req.params.id;
    const salary = yield database_service_1.default.SalaryPortion.findOne({ _id: new mongodb_1.ObjectId(salaryId) });
    const accounts = yield database_service_1.default.Account.find({}).toArray();
    const companies = yield database_service_1.default.Company.find({}).toArray();
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
});
exports.GeteditSalaryController = GeteditSalaryController;
