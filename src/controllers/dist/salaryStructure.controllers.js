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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.GetEditController = exports.GetIndexController = exports.GetCreateController = void 0;
var database_service_1 = require("~/services/database.service");
var enums_1 = require("~/constants/enums");
var mongodb_1 = require("mongodb");
var dir_1 = require("~/constants/dir");
// [GET] /salarystructure/create
exports.GetCreateController = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var company, formofpayment, SalaryportionTN, SalaryportionKT, paymentAccount;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, database_service_1["default"].Company.find({}).toArray()];
            case 1:
                company = _a.sent();
                return [4 /*yield*/, database_service_1["default"].FormOfPayment.find({}).toArray()];
            case 2:
                formofpayment = _a.sent();
                return [4 /*yield*/, database_service_1["default"].SalaryPortion.find({
                        deleted: false,
                        loai: enums_1.salaryType.ThuNhap
                    }).toArray()];
            case 3:
                SalaryportionTN = _a.sent();
                return [4 /*yield*/, database_service_1["default"].SalaryPortion.find({
                        deleted: false,
                        loai: enums_1.salaryType.KhauTru
                    }).toArray()];
            case 4:
                SalaryportionKT = _a.sent();
                return [4 /*yield*/, database_service_1["default"].PayMentAccount.find({}).toArray()];
            case 5:
                paymentAccount = _a.sent();
                console.log(paymentAccount);
                console.log(formofpayment);
                console.log(company);
                res.render('pages/salarystructure/create', {
                    pageTitle: 'Thêm mới cơ cấu lương',
                    company: company,
                    formofpayment: formofpayment,
                    SalaryportionTN: SalaryportionTN,
                    SalaryportionKT: SalaryportionKT,
                    paymentAccount: paymentAccount
                });
                return [2 /*return*/];
        }
    });
}); };
// [GET] /salarystructure
exports.GetIndexController = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var countProducts, filterId, filter_by, salaryStructure;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, database_service_1["default"].SalaryStructure.countDocuments({ deleted: false })];
            case 1:
                countProducts = _a.sent();
                return [4 /*yield*/, database_service_1["default"].SalaryStructure.find({ deleted: false }).project({ _id: 1, ten: 1 }).toArray()];
            case 2:
                filterId = _a.sent();
                filter_by = [
                    {
                        name: '_id',
                        operators: ['>', '<', '='],
                        selections: filterId.map(function (item) { return ({ value: item._id, ten: item.ten }); })
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
                return [4 /*yield*/, database_service_1["default"].SalaryStructure.find({ deleted: false }).limit(dir_1.limmit).toArray()];
            case 3:
                salaryStructure = _a.sent();
                res.render('pages/salarystructure/index', {
                    pageTitle: 'Cơ cấu lương',
                    salaryStructure: salaryStructure,
                    countProducts: countProducts,
                    limit: dir_1.limmit,
                    filter_by: filter_by
                });
                return [2 /*return*/];
        }
    });
}); };
// [GET] /salarystructure/edit/:id
exports.GetEditController = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, company, formofpayment, SalaryportionTN, SalaryportionKT, paymentAccount, salaryStructure;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                return [4 /*yield*/, database_service_1["default"].Company.find({}).toArray()];
            case 1:
                company = _a.sent();
                return [4 /*yield*/, database_service_1["default"].FormOfPayment.find({}).toArray()];
            case 2:
                formofpayment = _a.sent();
                return [4 /*yield*/, database_service_1["default"].SalaryPortion.find({
                        deleted: false,
                        loai: enums_1.salaryType.ThuNhap
                    }).toArray()];
            case 3:
                SalaryportionTN = _a.sent();
                return [4 /*yield*/, database_service_1["default"].SalaryPortion.find({
                        deleted: false,
                        loai: enums_1.salaryType.KhauTru
                    }).toArray()];
            case 4:
                SalaryportionKT = _a.sent();
                return [4 /*yield*/, database_service_1["default"].PayMentAccount.find({}).toArray()];
            case 5:
                paymentAccount = _a.sent();
                return [4 /*yield*/, database_service_1["default"].SalaryStructure.findOne({ deleted: false, _id: new mongodb_1.ObjectId(id) })];
            case 6:
                salaryStructure = _a.sent();
                if (salaryStructure) {
                    res.render('pages/salaryStructure/edit', {
                        pageTitle: 'Chỉnh Sửa Phân Lương',
                        Salary: salaryStructure,
                        company: company,
                        formofpayment: formofpayment,
                        SalaryportionTN: SalaryportionTN,
                        SalaryportionKT: SalaryportionKT,
                        paymentAccount: paymentAccount
                    });
                }
                else {
                    res.render('page/error/404');
                }
                return [2 /*return*/];
        }
    });
}); };
