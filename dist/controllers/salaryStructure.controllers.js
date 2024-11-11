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
exports.GetEditController = exports.GetIndexController = exports.GetCreateController = void 0;
const database_service_1 = __importDefault(require("../services/database.service"));
const enums_1 = require("../constants/enums");
const mongodb_1 = require("mongodb");
const dir_1 = require("../constants/dir");
const GetCreateController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const company = yield database_service_1.default.Company.find({}).toArray();
    const formofpayment = yield database_service_1.default.FormOfPayment.find({}).toArray();
    const SalaryportionTN = yield database_service_1.default.SalaryPortion.find({
        deleted: false,
        loai: enums_1.salaryType.ThuNhap
    }).toArray();
    const SalaryportionKT = yield database_service_1.default.SalaryPortion.find({
        deleted: false,
        loai: enums_1.salaryType.KhauTru
    }).toArray();
    const paymentAccount = yield database_service_1.default.PayMentAccount.find({}).toArray();
    console.log(paymentAccount);
    console.log(formofpayment);
    console.log(company);
    res.render('pages/salarystructure/create', {
        pageTitle: 'Thêm mới cơ cấu lương',
        company,
        formofpayment,
        SalaryportionTN,
        SalaryportionKT,
        paymentAccount
    });
});
exports.GetCreateController = GetCreateController;
const GetIndexController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const countProducts = yield database_service_1.default.SalaryStructure.countDocuments({ deleted: false });
    const filterId = yield database_service_1.default.SalaryStructure.find({ deleted: false }).project({ _id: 1, ten: 1 }).toArray();
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
            name: 'status',
            operators: ['='],
            selections: [
                { value: true, ten: 'Có' },
                { value: false, ten: 'Không' }
            ]
        },
        {
            name: 'chu_ky_phat_luong',
            operators: ['>', '<', '=']
        },
        {
            name: 'don_vi_tien_te',
            operators: ['>', '<', '=']
        },
        {
            name: 'updated_at',
            operators: ['>', '<', '=']
        }
    ];
    const salaryStructure = yield database_service_1.default.SalaryStructure.find({ deleted: false }).limit(dir_1.limmit).toArray();
    res.render('pages/salarystructure/index', {
        pageTitle: 'Cơ cấu lương',
        salaryStructure,
        countProducts,
        limit: dir_1.limmit,
        filter_by
    });
});
exports.GetIndexController = GetIndexController;
const GetEditController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const company = yield database_service_1.default.Company.find({}).toArray();
    const formofpayment = yield database_service_1.default.FormOfPayment.find({}).toArray();
    const SalaryportionTN = yield database_service_1.default.SalaryPortion.find({
        deleted: false,
        loai: enums_1.salaryType.ThuNhap
    }).toArray();
    const SalaryportionKT = yield database_service_1.default.SalaryPortion.find({
        deleted: false,
        loai: enums_1.salaryType.KhauTru
    }).toArray();
    const paymentAccount = yield database_service_1.default.PayMentAccount.find({}).toArray();
    const salaryStructure = yield database_service_1.default.SalaryStructure.findOne({ deleted: false, _id: new mongodb_1.ObjectId(id) });
    if (salaryStructure) {
        res.render('pages/salaryStructure/edit', {
            pageTitle: 'Chỉnh Sửa Phân Lương',
            Salary: salaryStructure,
            company,
            formofpayment,
            SalaryportionTN,
            SalaryportionKT,
            paymentAccount
        });
    }
    else {
        res.render('page/error/404');
    }
});
exports.GetEditController = GetEditController;
