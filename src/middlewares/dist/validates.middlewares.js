"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.updateSalaryStructureValidator = exports.createSalaryStructureValidator = exports.updateUserValidator = exports.createUserValidator = exports.editRoleValidator = exports.createRoleValidator = exports.loginValidator = exports.createSalaryValidator = exports.UpdateSalaryValidator = void 0;
var validation_1 = require("~/utils/validation");
var enums_1 = require("~/constants/enums");
var database_service_1 = require("~/services/database.service");
var messages_1 = require("~/constants/messages");
var mongodb_1 = require("mongodb");
var express_validator_1 = require("express-validator");
var messages_2 = require("~/constants/messages");
var crypto_1 = require("~/utils/crypto");
// Validator cho cập nhật phân lương
exports.UpdateSalaryValidator = validation_1.validate(express_validator_1.checkSchema({
    ten: {
        isString: true,
        trim: true,
        notEmpty: {
            errorMessage: messages_1.SALARY_MESSAGES.SALARY_NAME_REQUIRED // 'Tên phân lương là bắt buộc'
        },
        isLength: {
            options: { max: 255 },
            errorMessage: messages_1.SALARY_MESSAGES.SALARY_NAME_MAX_LENGTH // 'Tên phân lương không được vượt quá 255 ký tự'
        },
        custom: {
            options: function (value, _a) {
                var req = _a.req;
                return __awaiter(void 0, void 0, void 0, function () {
                    var salaryId, existingSalary;
                    var _b;
                    return __generator(this, function (_c) {
                        switch (_c.label) {
                            case 0:
                                salaryId = (_b = req.params) === null || _b === void 0 ? void 0 : _b.id // Lấy ID từ request params
                                ;
                                return [4 /*yield*/, database_service_1["default"].SalaryPortion.findOne({
                                        ten: value,
                                        _id: { $ne: new mongodb_1.ObjectId(salaryId) }
                                    })];
                            case 1:
                                existingSalary = _c.sent();
                                if (existingSalary) {
                                    throw new Error(messages_1.SALARY_MESSAGES.SALARY_NAME_EXISTS); // 'Tên phân lương đã tồn tại!!!'
                                }
                                return [2 /*return*/, true];
                        }
                    });
                });
            }
        }
    },
    loai: {
        isInt: {
            errorMessage: messages_1.SALARY_MESSAGES.SALARY_TYPE_MUST_BE_INTEGER // 'Loại phân lương phải là số nguyên'
        },
        toInt: true,
        custom: {
            options: function (value) {
                return Object.values(enums_1.salaryType).includes(value);
            },
            errorMessage: messages_1.SALARY_MESSAGES.SALARY_TYPE_INVALID // 'Loại phân lương chỉ được là khấu trừ hoặc thu nhập'
        }
    },
    mo_ta: {
        isString: true,
        optional: true,
        isLength: {
            options: { max: 5000 },
            errorMessage: messages_1.SALARY_MESSAGES.SALARY_DESCRIPTION_MAX_LENGTH // 'Mô tả không được vượt quá 500 ký tự'
        }
    },
    is_active: {
        isBoolean: {
            errorMessage: messages_1.SALARY_MESSAGES.SALARY_STATUS_MUST_BE_BOOLEAN // 'Trạng thái phải là kiểu boolean'
        },
        toBoolean: true
    },
    'tai_khoan_ke_toan.*.id_congty': {
        isMongoId: {
            errorMessage: messages_1.SALARY_MESSAGES.COMPANY_ID_INVALID // 'ID công ty phải là một ObjectId hợp lệ'
        }
    },
    'tai_khoan_ke_toan.*.id_ke_toan': {
        isMongoId: {
            errorMessage: messages_1.SALARY_MESSAGES.ACCOUNTANT_ID_INVALID // 'ID kế toán phải là một ObjectId hợp lệ'
        }
    },
    tai_khoan_ke_toan: {
        custom: {
            options: function (value) { return __awaiter(void 0, void 0, void 0, function () {
                var seen, _i, value_1, account, key, cty, kt;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            seen = new Set();
                            _i = 0, value_1 = value;
                            _a.label = 1;
                        case 1:
                            if (!(_i < value_1.length)) return [3 /*break*/, 5];
                            account = value_1[_i];
                            key = account.id_congty + "-" + account.id_ke_toan;
                            return [4 /*yield*/, database_service_1["default"].Company.findOne({ _id: new mongodb_1.ObjectId(account.id_congty) })];
                        case 2:
                            cty = _a.sent();
                            return [4 /*yield*/, database_service_1["default"].Account.findOne({ _id: new mongodb_1.ObjectId(account.id_ke_toan) })];
                        case 3:
                            kt = _a.sent();
                            if (!cty || !kt)
                                throw new Error("Could not find company and account");
                            if (seen.has(key)) {
                                throw new Error(messages_1.SALARY_MESSAGES.DUPLICATE_ACCOUNT_COMPANY_PAIR); // 'Có cặp ID công ty và ID kế toán bị trùng'
                            }
                            seen.add(key);
                            _a.label = 4;
                        case 4:
                            _i++;
                            return [3 /*break*/, 1];
                        case 5: return [2 /*return*/, true];
                    }
                });
            }); }
        }
    }
}, ['body'] // Kiểm tra trong body của request
));
exports.createSalaryValidator = validation_1.validate(express_validator_1.checkSchema({
    ten: {
        isString: true,
        trim: true,
        notEmpty: {
            errorMessage: messages_1.SALARY_MESSAGES.SALARY_NAME_REQUIRED // 'Tên phân lương là bắt buộc.'
        },
        isLength: {
            options: { max: 255 },
            errorMessage: messages_1.SALARY_MESSAGES.SALARY_NAME_MAX_LENGTH // 'Tên phân lương không được vượt quá 255 ký tự.'
        },
        custom: {
            options: function (value) { return __awaiter(void 0, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, database_service_1["default"].SalaryPortion.findOne({ ten: value })];
                        case 1:
                            result = _a.sent();
                            if (result) {
                                throw new Error(messages_1.SALARY_MESSAGES.SALARY_NAME_EXISTS); // 'Tên phân lương đã tồn tại!!!'
                            }
                            return [2 /*return*/, true];
                    }
                });
            }); }
        }
    },
    loai: {
        isInt: {
            errorMessage: messages_1.SALARY_MESSAGES.SALARY_TYPE_MUST_BE_INTEGER // 'Loại phân lương phải là số nguyên.'
        },
        toInt: true,
        custom: {
            options: function (value) {
                return Object.values(enums_1.salaryType).includes(value);
            },
            errorMessage: messages_1.SALARY_MESSAGES.SALARY_TYPE_INVALID // 'Loại phân lương chỉ được là khấu trừ hoặc thu nhập.'
        }
    },
    mo_ta: {
        isString: true,
        optional: true,
        isLength: {
            options: { max: 500 },
            errorMessage: messages_1.SALARY_MESSAGES.SALARY_DESCRIPTION_MAX_LENGTH // 'Mô tả không được vượt quá 500 ký tự.'
        }
    },
    is_active: {
        isBoolean: {
            errorMessage: messages_1.SALARY_MESSAGES.SALARY_STATUS_MUST_BE_BOOLEAN // 'Trạng thái phải là kiểu boolean.'
        },
        toBoolean: true
    },
    'tai_khoan_ke_toan.*.id_congty': {
        isMongoId: {
            errorMessage: messages_1.SALARY_MESSAGES.COMPANY_ID_INVALID // 'ID công ty phải là một ObjectId hợp lệ.'
        }
    },
    'tai_khoan_ke_toan.*.id_ke_toan': {
        isMongoId: {
            errorMessage: messages_1.SALARY_MESSAGES.ACCOUNTANT_ID_INVALID // 'ID kế toán phải là một ObjectId hợp lệ.'
        }
    },
    tai_khoan_ke_toan: {
        custom: {
            options: function (value) { return __awaiter(void 0, void 0, void 0, function () {
                var seen, _i, value_2, account, key, cty, kt;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            seen = new Set();
                            _i = 0, value_2 = value;
                            _a.label = 1;
                        case 1:
                            if (!(_i < value_2.length)) return [3 /*break*/, 5];
                            account = value_2[_i];
                            key = account.id_congty + "-" + account.id_ke_toan;
                            return [4 /*yield*/, database_service_1["default"].Company.findOne({ _id: new mongodb_1.ObjectId(account.id_congty) })];
                        case 2:
                            cty = _a.sent();
                            return [4 /*yield*/, database_service_1["default"].Account.findOne({ _id: new mongodb_1.ObjectId(account.id_ke_toan) })];
                        case 3:
                            kt = _a.sent();
                            if (!cty || !kt)
                                throw new Error("Could not find company and account");
                            if (seen.has(key)) {
                                throw new Error(messages_1.SALARY_MESSAGES.DUPLICATE_ACCOUNT_COMPANY_PAIR); // 'Có cặp ID công ty và ID kế toán bị trùng.'
                            }
                            seen.add(key);
                            _a.label = 4;
                        case 4:
                            _i++;
                            return [3 /*break*/, 1];
                        case 5: return [2 /*return*/, true];
                    }
                });
            }); }
        }
    }
}, ['body']));
var passwordSchema = {
    notEmpty: {
        errorMessage: messages_2.MESSAGES.PASSWORD_IS_REQUIRED
    },
    isString: {
        errorMessage: messages_2.MESSAGES.PASSWORD_MUST_BE_A_STRING
    },
    isLength: {
        options: {
            min: 6,
            max: 50
        },
        errorMessage: messages_2.MESSAGES.PASSWORD_LENGTH_MUST_BE_FROM_6_TO_50
    },
    isStrongPassword: {
        options: {
            minLength: 6,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1
        },
        errorMessage: messages_2.MESSAGES.PASSWORD_MUST_BE_STRONG
    }
};
exports.loginValidator = validation_1.validate(express_validator_1.checkSchema({
    email: {
        isEmail: {
            errorMessage: messages_2.MESSAGES.EMAIL_IS_INVALID
        },
        trim: true,
        custom: {
            options: function (value, _a) {
                var req = _a.req;
                return __awaiter(void 0, void 0, void 0, function () {
                    var user;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0: return [4 /*yield*/, database_service_1["default"].User.findOne({
                                    email: req.body.email,
                                    password: crypto_1.hashPassword(req.body.password),
                                    is_active: true
                                })];
                            case 1:
                                user = _b.sent();
                                if (user === null) {
                                    throw new Error(messages_2.MESSAGES.EMAIL_OR_PASSWORD_IS_INCORRECT);
                                }
                                req.user = user;
                                return [2 /*return*/, true];
                        }
                    });
                });
            }
        }
    },
    password: passwordSchema
}));
exports.createRoleValidator = validation_1.validate(express_validator_1.checkSchema({
    title: {
        isString: {
            errorMessage: 'Tên vai trò phải là chuỗi ký tự.'
        },
        trim: true,
        notEmpty: {
            errorMessage: 'Tên vai trò là bắt buộc.'
        },
        isLength: {
            options: { max: 255 },
            errorMessage: 'Tên vai trò không được vượt quá 255 ký tự.'
        },
        custom: {
            options: function (value) { return __awaiter(void 0, void 0, void 0, function () {
                var existingRole;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, database_service_1["default"].Role.findOne({ title: value })];
                        case 1:
                            existingRole = _a.sent();
                            if (existingRole) {
                                throw new Error('Tên vai trò đã tồn tại.');
                            }
                            return [2 /*return*/, true];
                    }
                });
            }); }
        }
    },
    description: {
        isString: {
            errorMessage: 'Mô tả phải là chuỗi ký tự.'
        },
        optional: true,
        isLength: {
            options: { max: 500 },
            errorMessage: 'Mô tả không được vượt quá 500 ký tự.'
        }
    },
    permission: {
        isArray: {
            errorMessage: 'Danh sách quyền phải là một mảng.'
        },
        optional: true,
        custom: {
            options: function (value) { return Array.isArray(value) && value.every(function (perm) { return typeof perm === 'string'; }); },
            errorMessage: 'Mỗi quyền trong danh sách phải là chuỗi ký tự.'
        }
    },
    deleted: {
        isBoolean: {
            errorMessage: 'Trạng thái xóa phải là kiểu boolean.'
        },
        optional: true
    }
}));
exports.editRoleValidator = validation_1.validate(express_validator_1.checkSchema({
    title: {
        isString: {
            errorMessage: 'Tên vai trò phải là chuỗi ký tự.'
        },
        trim: true,
        notEmpty: {
            errorMessage: 'Tên vai trò là bắt buộc.'
        },
        isLength: {
            options: { max: 255 },
            errorMessage: 'Tên vai trò không được vượt quá 255 ký tự.'
        },
        custom: {
            options: function (value, _a) {
                var req = _a.req;
                return __awaiter(void 0, void 0, void 0, function () {
                    var roleId, existingRole;
                    var _b;
                    return __generator(this, function (_c) {
                        switch (_c.label) {
                            case 0:
                                roleId = (_b = req.params) === null || _b === void 0 ? void 0 : _b.id // Lấy ID của Role từ request params
                                ;
                                return [4 /*yield*/, database_service_1["default"].Role.findOne({
                                        title: value,
                                        _id: { $ne: new mongodb_1.ObjectId(roleId) } // Loại trừ chính nó bằng ID
                                    })];
                            case 1:
                                existingRole = _c.sent();
                                if (existingRole) {
                                    throw new Error('Tên vai trò đã tồn tại.');
                                }
                                return [2 /*return*/, true];
                        }
                    });
                });
            }
        }
    },
    description: {
        isString: {
            errorMessage: 'Mô tả phải là chuỗi ký tự.'
        },
        optional: true,
        isLength: {
            options: { max: 500 },
            errorMessage: 'Mô tả không được vượt quá 500 ký tự.'
        }
    },
    permission: {
        isArray: {
            errorMessage: 'Danh sách quyền phải là một mảng.'
        },
        optional: true,
        custom: {
            options: function (value) { return Array.isArray(value) && value.every(function (perm) { return typeof perm === 'string'; }); },
            errorMessage: 'Mỗi quyền trong danh sách phải là chuỗi ký tự.'
        }
    },
    deleted: {
        isBoolean: {
            errorMessage: 'Trạng thái xóa phải là kiểu boolean.'
        },
        optional: true
    }
}));
exports.createUserValidator = validation_1.validate(express_validator_1.checkSchema({
    name: {
        notEmpty: {
            errorMessage: messages_2.MESSAGES.NAME_IS_REQUIRED
        },
        isString: {
            errorMessage: 'Tên người dùng phải là chuỗi ký tự.'
        },
        isLength: {
            options: { max: 255 },
            errorMessage: 'Tên người dùng không được vượt quá 255 ký tự.'
        }
    },
    email: {
        notEmpty: {
            errorMessage: messages_2.MESSAGES.EMAIL_IS_REQUIRED
        },
        isEmail: {
            errorMessage: messages_2.MESSAGES.EMAIL_INVALID
        },
        custom: {
            options: function (value) { return __awaiter(void 0, void 0, void 0, function () {
                var user;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, database_service_1["default"].User.findOne({ email: value })];
                        case 1:
                            user = _a.sent();
                            if (user) {
                                throw new Error(messages_2.MESSAGES.EMAIL_ALREADY_EXISTS);
                            }
                            return [2 /*return*/, true];
                    }
                });
            }); }
        }
    },
    role_id: {
        notEmpty: {
            errorMessage: messages_2.MESSAGES.ROLE_ID_IS_REQUIRED
        },
        isString: {
            errorMessage: 'Role ID phải là chuỗi ký tự.'
        },
        custom: {
            options: function (value) { return __awaiter(void 0, void 0, void 0, function () {
                var role;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, database_service_1["default"].Role.findOne({ _id: new mongodb_1.ObjectId(value) })];
                        case 1:
                            role = _a.sent();
                            if (!role) {
                                throw new Error(messages_2.MESSAGES.ROLE_ID_INVALID);
                            }
                            return [2 /*return*/, true];
                    }
                });
            }); }
        }
    },
    password: passwordSchema,
    is_active: {
        isBoolean: {
            errorMessage: 'Trạng thái hoạt động phải là kiểu boolean.'
        },
        optional: true
    },
    deleted: {
        isBoolean: {
            errorMessage: 'Trạng thái xóa phải là kiểu boolean.'
        },
        optional: true
    },
    created_at: {
        isDate: {
            errorMessage: 'Ngày tạo phải là kiểu ngày hợp lệ.'
        },
        optional: true
    },
    updated_at: {
        isDate: {
            errorMessage: 'Ngày cập nhật phải là kiểu ngày hợp lệ.'
        },
        optional: true
    },
    deleted_at: {
        isDate: {
            errorMessage: 'Ngày xóa phải là kiểu ngày hợp lệ.'
        },
        optional: true
    }
}));
exports.updateUserValidator = validation_1.validate(express_validator_1.checkSchema({
    name: {
        isString: {
            errorMessage: 'Tên người dùng phải là chuỗi ký tự.'
        },
        optional: true,
        isLength: {
            options: { max: 255 },
            errorMessage: 'Tên người dùng không được vượt quá 255 ký tự.'
        }
    },
    email: {
        isEmail: {
            errorMessage: 'Email không hợp lệ.'
        },
        optional: true,
        custom: {
            options: function (value, _a) {
                var req = _a.req;
                return __awaiter(void 0, void 0, void 0, function () {
                    var userId, user;
                    var _b;
                    return __generator(this, function (_c) {
                        switch (_c.label) {
                            case 0:
                                userId = (_b = req.params) === null || _b === void 0 ? void 0 : _b.id;
                                return [4 /*yield*/, database_service_1["default"].User.findOne({ email: value, _id: { $ne: new mongodb_1.ObjectId(userId) } })];
                            case 1:
                                user = _c.sent();
                                if (user) {
                                    throw new Error('Email đã tồn tại.');
                                }
                                return [2 /*return*/, true];
                        }
                    });
                });
            }
        }
    },
    role_id: {
        isString: {
            errorMessage: 'Role ID phải là chuỗi ký tự.'
        },
        optional: true,
        custom: {
            options: function (value) { return __awaiter(void 0, void 0, void 0, function () {
                var role;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, database_service_1["default"].Role.findOne({ _id: new mongodb_1.ObjectId(value) })];
                        case 1:
                            role = _a.sent();
                            if (!role) {
                                throw new Error('Role ID không hợp lệ.');
                            }
                            return [2 /*return*/, true];
                    }
                });
            }); }
        }
    },
    password: __assign(__assign({}, passwordSchema), { optional: true // Để cho phép cập nhật mà không cần thay đổi mật khẩu
     }),
    is_active: {
        isBoolean: {
            errorMessage: 'Trạng thái hoạt động phải là kiểu boolean.'
        },
        optional: true
    },
    deleted: {
        isBoolean: {
            errorMessage: 'Trạng thái xóa phải là kiểu boolean.'
        },
        optional: true
    },
    created_at: {
        isDate: {
            errorMessage: 'Ngày tạo phải là kiểu ngày hợp lệ.'
        },
        optional: true
    },
    updated_at: {
        isDate: {
            errorMessage: 'Ngày cập nhật phải là kiểu ngày hợp lệ.'
        },
        optional: true
    },
    deleted_at: {
        isDate: {
            errorMessage: 'Ngày xóa phải là kiểu ngày hợp lệ.'
        },
        optional: true
    }
}));
exports.createSalaryStructureValidator = validation_1.validate(express_validator_1.checkSchema({
    ten: {
        notEmpty: {
            errorMessage: messages_2.SALARY_STRUCTURE_MESSAGE.NAME_IS_REQUIRED
        },
        isString: {
            errorMessage: 'Tên cấu trúc lương phải là chuỗi.'
        },
        isLength: {
            options: { max: 255 },
            errorMessage: 'Tên cấu trúc lương không được vượt quá 255 ký tự.'
        },
        custom: {
            options: function (value) { return __awaiter(void 0, void 0, void 0, function () {
                var existingSalaryStructure;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, database_service_1["default"].SalaryStructure.findOne({ ten: value })];
                        case 1:
                            existingSalaryStructure = _a.sent();
                            if (existingSalaryStructure) {
                                throw new Error('Tên cấu trúc lương đã tồn tại.');
                            }
                            return [2 /*return*/, true];
                    }
                });
            }); }
        }
    },
    id_cong_ty: {
        notEmpty: {
            errorMessage: messages_2.SALARY_STRUCTURE_MESSAGE.COMPANY_ID_IS_REQUIRED
        },
        isMongoId: {
            errorMessage: 'ID công ty không hợp lệ.'
        }
    },
    status: {
        isBoolean: {
            errorMessage: messages_2.SALARY_STRUCTURE_MESSAGE.STATUS_IS_REQUIRED
        }
    },
    chu_ky_phat_luong: {
        notEmpty: {
            errorMessage: messages_2.SALARY_STRUCTURE_MESSAGE.PAY_PERIOD_IS_REQUIRED
        },
        isString: {
            errorMessage: 'Chu kỳ phát lương phải là chuỗi.'
        }
    },
    don_vi_tien_te: {
        notEmpty: {
            errorMessage: messages_2.SALARY_STRUCTURE_MESSAGE.CURRENCY_UNIT_IS_REQUIRED
        },
        isString: {
            errorMessage: 'Đơn vị tiền tệ phải là chuỗi.'
        }
    },
    thu_nhap: {
        isArray: {
            errorMessage: messages_2.SALARY_STRUCTURE_MESSAGE.INCOME_IS_ARRAY
        },
        custom: {
            options: function (value) { return __awaiter(void 0, void 0, void 0, function () {
                var _i, value_3, item, id;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _i = 0, value_3 = value;
                            _a.label = 1;
                        case 1:
                            if (!(_i < value_3.length)) return [3 /*break*/, 4];
                            item = value_3[_i];
                            return [4 /*yield*/, database_service_1["default"].SalaryPortion.findOne({ _id: new mongodb_1.ObjectId(item.id_phan_luong) })];
                        case 2:
                            id = _a.sent();
                            if (!id)
                                throw new Error("Salary not found!!!");
                            if (item.so_tien < 0) {
                                throw new Error(messages_2.SALARY_STRUCTURE_MESSAGE.INVALID_AMOUNT);
                            }
                            _a.label = 3;
                        case 3:
                            _i++;
                            return [3 /*break*/, 1];
                        case 4: return [2 /*return*/, true];
                    }
                });
            }); }
        }
    },
    khau_tru: {
        isArray: {
            errorMessage: messages_2.SALARY_STRUCTURE_MESSAGE.DEDUCTION_IS_ARRAY
        },
        custom: {
            options: function (value) { return __awaiter(void 0, void 0, void 0, function () {
                var _i, value_4, item, id;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _i = 0, value_4 = value;
                            _a.label = 1;
                        case 1:
                            if (!(_i < value_4.length)) return [3 /*break*/, 4];
                            item = value_4[_i];
                            return [4 /*yield*/, database_service_1["default"].SalaryPortion.findOne({ _id: new mongodb_1.ObjectId(item.id_phan_luong) })];
                        case 2:
                            id = _a.sent();
                            if (!id)
                                throw new Error("Salary not found!!!");
                            if (item.so_tien < 0) {
                                throw new Error(messages_2.SALARY_STRUCTURE_MESSAGE.INVALID_AMOUNT);
                            }
                            _a.label = 3;
                        case 3:
                            _i++;
                            return [3 /*break*/, 1];
                        case 4: return [2 /*return*/, true];
                    }
                });
            }); }
        }
    },
    hinh_thuc_chi_tra: {
        notEmpty: {
            errorMessage: messages_2.SALARY_STRUCTURE_MESSAGE.PAYMENT_METHOD_IS_REQUIRED
        },
        isObject: {
            errorMessage: 'Hình thức chi trả phải là một đối tượng.'
        },
        custom: {
            options: function (value) { return __awaiter(void 0, void 0, void 0, function () {
                var ht, tk;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, database_service_1["default"].FormOfPayment.findOne({ _id: new mongodb_1.ObjectId(value.id_hinh_thuc) })];
                        case 1:
                            ht = _a.sent();
                            return [4 /*yield*/, database_service_1["default"].PayMentAccount.findOne({ _id: new mongodb_1.ObjectId(value.id_tai_khoan_chi_tra) })];
                        case 2:
                            tk = _a.sent();
                            if (!ht || !tk)
                                throw new Error('Không thể tìm thấy id hình thưc hoặc id tài khoản chi trả!!!');
                            if (!value.id_hinh_thuc || !value.id_tai_khoan_chi_tra) {
                                throw new Error(messages_2.SALARY_STRUCTURE_MESSAGE.PAYMENT_METHOD_IS_REQUIRED);
                            }
                            return [2 /*return*/, true];
                    }
                });
            }); }
        }
    },
    deleted: {
        isBoolean: {
            errorMessage: 'Trạng thái xóa phải là kiểu boolean.'
        },
        optional: true
    },
    created_at: {
        isDate: {
            errorMessage: 'Ngày tạo phải là kiểu ngày hợp lệ.'
        },
        optional: true
    },
    updated_at: {
        isDate: {
            errorMessage: 'Ngày cập nhật phải là kiểu ngày hợp lệ.'
        },
        optional: true
    }
}));
// Validator cho việc cập nhật cấu trúc lương
exports.updateSalaryStructureValidator = validation_1.validate(express_validator_1.checkSchema({
    ten: {
        isString: {
            errorMessage: 'Tên cấu trúc lương phải là chuỗi.'
        },
        optional: true,
        isLength: {
            options: { max: 255 },
            errorMessage: 'Tên cấu trúc lương không được vượt quá 255 ký tự.'
        },
        custom: {
            options: function (value, _a) {
                var req = _a.req;
                return __awaiter(void 0, void 0, void 0, function () {
                    var id, existingSalaryStructure;
                    var _b;
                    return __generator(this, function (_c) {
                        switch (_c.label) {
                            case 0:
                                id = (_b = req.params) === null || _b === void 0 ? void 0 : _b.id;
                                return [4 /*yield*/, database_service_1["default"].SalaryStructure.findOne({
                                        ten: value,
                                        _id: { $ne: new mongodb_1.ObjectId(id) } // Loại trừ bản ghi có id hiện tại
                                    })];
                            case 1:
                                existingSalaryStructure = _c.sent();
                                if (existingSalaryStructure) {
                                    throw new Error('Tên cấu trúc lương đã tồn tại.');
                                }
                                return [2 /*return*/, true];
                        }
                    });
                });
            }
        }
    },
    id_cong_ty: {
        isMongoId: {
            errorMessage: 'ID công ty không hợp lệ.'
        },
        optional: true
    },
    status: {
        isBoolean: {
            errorMessage: 'Trạng thái phải là kiểu boolean.'
        },
        optional: true
    },
    chu_ky_phat_luong: {
        isString: {
            errorMessage: 'Chu kỳ phát lương phải là chuỗi.'
        },
        optional: true
    },
    don_vi_tien_te: {
        isString: {
            errorMessage: 'Đơn vị tiền tệ phải là chuỗi.'
        },
        optional: true
    },
    thu_nhap: {
        isArray: {
            errorMessage: messages_2.SALARY_STRUCTURE_MESSAGE.INCOME_IS_ARRAY
        },
        optional: true,
        custom: {
            options: function (value) { return __awaiter(void 0, void 0, void 0, function () {
                var _i, value_5, item, id;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _i = 0, value_5 = value;
                            _a.label = 1;
                        case 1:
                            if (!(_i < value_5.length)) return [3 /*break*/, 4];
                            item = value_5[_i];
                            return [4 /*yield*/, database_service_1["default"].SalaryPortion.findOne({ _id: new mongodb_1.ObjectId(item.id_phan_luong) })];
                        case 2:
                            id = _a.sent();
                            if (!id)
                                throw new Error("Salary not found!!!");
                            if (item.so_tien < 0) {
                                throw new Error(messages_2.SALARY_STRUCTURE_MESSAGE.INVALID_AMOUNT);
                            }
                            _a.label = 3;
                        case 3:
                            _i++;
                            return [3 /*break*/, 1];
                        case 4: return [2 /*return*/, true];
                    }
                });
            }); }
        }
    },
    khau_tru: {
        isArray: {
            errorMessage: messages_2.SALARY_STRUCTURE_MESSAGE.DEDUCTION_IS_ARRAY
        },
        optional: true,
        custom: {
            options: function (value) { return __awaiter(void 0, void 0, void 0, function () {
                var _i, value_6, item, id;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _i = 0, value_6 = value;
                            _a.label = 1;
                        case 1:
                            if (!(_i < value_6.length)) return [3 /*break*/, 4];
                            item = value_6[_i];
                            return [4 /*yield*/, database_service_1["default"].SalaryPortion.findOne({ _id: new mongodb_1.ObjectId(item.id_phan_luong) })];
                        case 2:
                            id = _a.sent();
                            if (!id)
                                throw new Error("Salary not found!!!");
                            if (item.so_tien < 0) {
                                throw new Error(messages_2.SALARY_STRUCTURE_MESSAGE.INVALID_AMOUNT);
                            }
                            _a.label = 3;
                        case 3:
                            _i++;
                            return [3 /*break*/, 1];
                        case 4: return [2 /*return*/, true];
                    }
                });
            }); }
        }
    },
    hinh_thuc_chi_tra: {
        isObject: {
            errorMessage: 'Hình thức chi trả phải là một đối tượng.'
        },
        optional: true,
        custom: {
            options: function (value) { return __awaiter(void 0, void 0, void 0, function () {
                var ht, tk;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, database_service_1["default"].FormOfPayment.findOne({ _id: new mongodb_1.ObjectId(value.id_hinh_thuc) })];
                        case 1:
                            ht = _a.sent();
                            return [4 /*yield*/, database_service_1["default"].PayMentAccount.findOne({ _id: new mongodb_1.ObjectId(value.id_tai_khoan_chi_tra) })];
                        case 2:
                            tk = _a.sent();
                            if (!ht || !tk)
                                throw new Error('Không thể tìm thấy id hình thưc hoặc id tài khoản chi trả!!!');
                            if (!value.id_hinh_thuc || !value.id_tai_khoan_chi_tra) {
                                throw new Error(messages_2.SALARY_STRUCTURE_MESSAGE.PAYMENT_METHOD_IS_REQUIRED);
                            }
                            return [2 /*return*/, true];
                    }
                });
            }); }
        }
    },
    deleted: {
        isBoolean: {
            errorMessage: 'Trạng thái xóa phải là kiểu boolean.'
        },
        optional: true
    },
    created_at: {
        isDate: {
            errorMessage: 'Ngày tạo phải là kiểu ngày hợp lệ.'
        },
        optional: true
    },
    updated_at: {
        isDate: {
            errorMessage: 'Ngày cập nhật phải là kiểu ngày hợp lệ.'
        },
        optional: true
    }
}));
