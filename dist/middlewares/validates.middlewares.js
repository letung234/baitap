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
exports.updateSalaryStructureValidator = exports.createSalaryStructureValidator = exports.updateUserValidator = exports.createUserValidator = exports.editRoleValidator = exports.createRoleValidator = exports.loginValidator = exports.createSalaryValidator = exports.UpdateSalaryValidator = void 0;
const validation_1 = require("../utils/validation");
const enums_1 = require("../constants/enums");
const database_service_1 = __importDefault(require("../services/database.service"));
const messages_1 = require("../constants/messages");
const mongodb_1 = require("mongodb");
const express_validator_1 = require("express-validator");
const messages_2 = require("../constants/messages");
const crypto_1 = require("../utils/crypto");
// Validator cho cập nhật phân lương
exports.UpdateSalaryValidator = (0, validation_1.validate)((0, express_validator_1.checkSchema)({
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
            options: (value_1, _a) => __awaiter(void 0, [value_1, _a], void 0, function* (value, { req }) {
                var _b;
                // Kiểm tra nếu tên đã tồn tại cho phân lương khác
                const salaryId = (_b = req.params) === null || _b === void 0 ? void 0 : _b.id; // Lấy ID từ request params
                const existingSalary = yield database_service_1.default.SalaryPortion.findOne({
                    ten: value,
                    _id: { $ne: new mongodb_1.ObjectId(salaryId) }
                });
                if (existingSalary) {
                    throw new Error(messages_1.SALARY_MESSAGES.SALARY_NAME_EXISTS); // 'Tên phân lương đã tồn tại!!!'
                }
                return true;
            })
        }
    },
    loai: {
        isInt: {
            errorMessage: messages_1.SALARY_MESSAGES.SALARY_TYPE_MUST_BE_INTEGER // 'Loại phân lương phải là số nguyên'
        },
        toInt: true,
        custom: {
            options: (value) => {
                return Object.values(enums_1.salaryType).includes(value);
            },
            errorMessage: messages_1.SALARY_MESSAGES.SALARY_TYPE_INVALID // 'Loại phân lương chỉ được là khấu trừ hoặc thu nhập'
        }
    },
    mo_ta: {
        isString: true,
        optional: true, // Trường này không bắt buộc
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
            options: (value) => __awaiter(void 0, void 0, void 0, function* () {
                const seen = new Set();
                for (const account of value) {
                    const key = `${account.id_congty}-${account.id_ke_toan}`;
                    const cty = yield database_service_1.default.Company.findOne({ _id: new mongodb_1.ObjectId(account.id_congty) });
                    const kt = yield database_service_1.default.Account.findOne({ _id: new mongodb_1.ObjectId(account.id_ke_toan) });
                    if (!cty || !kt)
                        throw new Error(`Could not find company and account`);
                    if (seen.has(key)) {
                        throw new Error(messages_1.SALARY_MESSAGES.DUPLICATE_ACCOUNT_COMPANY_PAIR); // 'Có cặp ID công ty và ID kế toán bị trùng'
                    }
                    seen.add(key);
                }
                return true;
            })
        }
    }
}, ['body'] // Kiểm tra trong body của request
));
exports.createSalaryValidator = (0, validation_1.validate)((0, express_validator_1.checkSchema)({
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
            options: (value) => __awaiter(void 0, void 0, void 0, function* () {
                const result = yield database_service_1.default.SalaryPortion.findOne({ ten: value });
                if (result) {
                    throw new Error(messages_1.SALARY_MESSAGES.SALARY_NAME_EXISTS); // 'Tên phân lương đã tồn tại!!!'
                }
                return true;
            })
        }
    },
    loai: {
        isInt: {
            errorMessage: messages_1.SALARY_MESSAGES.SALARY_TYPE_MUST_BE_INTEGER // 'Loại phân lương phải là số nguyên.'
        },
        toInt: true,
        custom: {
            options: (value) => {
                return Object.values(enums_1.salaryType).includes(value);
            },
            errorMessage: messages_1.SALARY_MESSAGES.SALARY_TYPE_INVALID // 'Loại phân lương chỉ được là khấu trừ hoặc thu nhập.'
        }
    },
    mo_ta: {
        isString: true,
        optional: true, // Trường này không bắt buộc
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
            options: (value) => __awaiter(void 0, void 0, void 0, function* () {
                const seen = new Set();
                for (const account of value) {
                    const key = `${account.id_congty}-${account.id_ke_toan}`;
                    const cty = yield database_service_1.default.Company.findOne({ _id: new mongodb_1.ObjectId(account.id_congty) });
                    const kt = yield database_service_1.default.Account.findOne({ _id: new mongodb_1.ObjectId(account.id_ke_toan) });
                    if (!cty || !kt)
                        throw new Error(`Could not find company and account`);
                    if (seen.has(key)) {
                        throw new Error(messages_1.SALARY_MESSAGES.DUPLICATE_ACCOUNT_COMPANY_PAIR); // 'Có cặp ID công ty và ID kế toán bị trùng.'
                    }
                    seen.add(key);
                }
                return true;
            })
        }
    }
}, ['body']));
const passwordSchema = {
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
exports.loginValidator = (0, validation_1.validate)((0, express_validator_1.checkSchema)({
    email: {
        isEmail: {
            errorMessage: messages_2.MESSAGES.EMAIL_IS_INVALID
        },
        trim: true,
        custom: {
            options: (value_1, _a) => __awaiter(void 0, [value_1, _a], void 0, function* (value, { req }) {
                const user = yield database_service_1.default.User.findOne({
                    email: req.body.email,
                    password: (0, crypto_1.hashPassword)(req.body.password),
                    is_active: true
                });
                if (user === null) {
                    throw new Error(messages_2.MESSAGES.EMAIL_OR_PASSWORD_IS_INCORRECT);
                }
                req.user = user;
                return true;
            })
        }
    },
    password: passwordSchema
}));
exports.createRoleValidator = (0, validation_1.validate)((0, express_validator_1.checkSchema)({
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
            options: (value) => __awaiter(void 0, void 0, void 0, function* () {
                // Kiểm tra nếu tên role đã tồn tại
                const existingRole = yield database_service_1.default.Role.findOne({ title: value });
                if (existingRole) {
                    throw new Error('Tên vai trò đã tồn tại.');
                }
                return true;
            })
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
            options: (value) => Array.isArray(value) && value.every((perm) => typeof perm === 'string'),
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
exports.editRoleValidator = (0, validation_1.validate)((0, express_validator_1.checkSchema)({
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
            options: (value_1, _a) => __awaiter(void 0, [value_1, _a], void 0, function* (value, { req }) {
                var _b;
                const roleId = (_b = req.params) === null || _b === void 0 ? void 0 : _b.id; // Lấy ID của Role từ request params
                // Kiểm tra xem role khác với role hiện tại có cùng title hay không
                const existingRole = yield database_service_1.default.Role.findOne({
                    title: value,
                    _id: { $ne: new mongodb_1.ObjectId(roleId) } // Loại trừ chính nó bằng ID
                });
                if (existingRole) {
                    throw new Error('Tên vai trò đã tồn tại.');
                }
                return true;
            })
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
            options: (value) => Array.isArray(value) && value.every((perm) => typeof perm === 'string'),
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
exports.createUserValidator = (0, validation_1.validate)((0, express_validator_1.checkSchema)({
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
            options: (value) => __awaiter(void 0, void 0, void 0, function* () {
                const user = yield database_service_1.default.User.findOne({ email: value });
                if (user) {
                    throw new Error(messages_2.MESSAGES.EMAIL_ALREADY_EXISTS);
                }
                return true;
            })
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
            options: (value) => __awaiter(void 0, void 0, void 0, function* () {
                const role = yield database_service_1.default.Role.findOne({ _id: new mongodb_1.ObjectId(value) });
                if (!role) {
                    throw new Error(messages_2.MESSAGES.ROLE_ID_INVALID);
                }
                return true;
            })
        }
    },
    password: passwordSchema, // Sử dụng passwordSchema ở đây
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
exports.updateUserValidator = (0, validation_1.validate)((0, express_validator_1.checkSchema)({
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
            options: (value_1, _a) => __awaiter(void 0, [value_1, _a], void 0, function* (value, { req }) {
                var _b;
                const userId = (_b = req.params) === null || _b === void 0 ? void 0 : _b.id;
                const user = yield database_service_1.default.User.findOne({ email: value, _id: { $ne: new mongodb_1.ObjectId(userId) } });
                if (user) {
                    throw new Error('Email đã tồn tại.');
                }
                return true;
            })
        }
    },
    role_id: {
        isString: {
            errorMessage: 'Role ID phải là chuỗi ký tự.'
        },
        optional: true,
        custom: {
            options: (value) => __awaiter(void 0, void 0, void 0, function* () {
                const role = yield database_service_1.default.Role.findOne({ _id: new mongodb_1.ObjectId(value) });
                if (!role) {
                    throw new Error('Role ID không hợp lệ.');
                }
                return true;
            })
        }
    },
    password: Object.assign(Object.assign({}, passwordSchema), { optional: true // Để cho phép cập nhật mà không cần thay đổi mật khẩu
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
exports.createSalaryStructureValidator = (0, validation_1.validate)((0, express_validator_1.checkSchema)({
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
            options: (value) => __awaiter(void 0, void 0, void 0, function* () {
                const existingSalaryStructure = yield database_service_1.default.SalaryStructure.findOne({ ten: value });
                if (existingSalaryStructure) {
                    throw new Error('Tên cấu trúc lương đã tồn tại.');
                }
                return true;
            })
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
            options: (value) => __awaiter(void 0, void 0, void 0, function* () {
                for (const item of value) {
                    const id = yield database_service_1.default.SalaryPortion.findOne({ _id: new mongodb_1.ObjectId(item.id_phan_luong) });
                    if (!id)
                        throw new Error(`Salary not found!!!`);
                    if (item.so_tien < 0) {
                        throw new Error(messages_2.SALARY_STRUCTURE_MESSAGE.INVALID_AMOUNT);
                    }
                }
                return true;
            })
        }
    },
    khau_tru: {
        isArray: {
            errorMessage: messages_2.SALARY_STRUCTURE_MESSAGE.DEDUCTION_IS_ARRAY
        },
        custom: {
            options: (value) => __awaiter(void 0, void 0, void 0, function* () {
                for (const item of value) {
                    const id = yield database_service_1.default.SalaryPortion.findOne({ _id: new mongodb_1.ObjectId(item.id_phan_luong) });
                    if (!id)
                        throw new Error(`Salary not found!!!`);
                    if (item.so_tien < 0) {
                        throw new Error(messages_2.SALARY_STRUCTURE_MESSAGE.INVALID_AMOUNT);
                    }
                }
                return true;
            })
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
            options: (value) => __awaiter(void 0, void 0, void 0, function* () {
                const ht = yield database_service_1.default.FormOfPayment.findOne({ _id: new mongodb_1.ObjectId(value.id_hinh_thuc) });
                const tk = yield database_service_1.default.PayMentAccount.findOne({ _id: new mongodb_1.ObjectId(value.id_tai_khoan_chi_tra) });
                if (!ht || !tk)
                    throw new Error('Không thể tìm thấy id hình thưc hoặc id tài khoản chi trả!!!');
                if (!value.id_hinh_thuc || !value.id_tai_khoan_chi_tra) {
                    throw new Error(messages_2.SALARY_STRUCTURE_MESSAGE.PAYMENT_METHOD_IS_REQUIRED);
                }
                return true;
            })
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
exports.updateSalaryStructureValidator = (0, validation_1.validate)((0, express_validator_1.checkSchema)({
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
            options: (value_1, _a) => __awaiter(void 0, [value_1, _a], void 0, function* (value, { req }) {
                var _b;
                const id = (_b = req.params) === null || _b === void 0 ? void 0 : _b.id;
                const existingSalaryStructure = yield database_service_1.default.SalaryStructure.findOne({
                    ten: value,
                    _id: { $ne: new mongodb_1.ObjectId(id) } // Loại trừ bản ghi có id hiện tại
                });
                if (existingSalaryStructure) {
                    throw new Error('Tên cấu trúc lương đã tồn tại.');
                }
                return true;
            })
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
            options: (value) => __awaiter(void 0, void 0, void 0, function* () {
                for (const item of value) {
                    const id = yield database_service_1.default.SalaryPortion.findOne({ _id: new mongodb_1.ObjectId(item.id_phan_luong) });
                    if (!id)
                        throw new Error(`Salary not found!!!`);
                    if (item.so_tien < 0) {
                        throw new Error(messages_2.SALARY_STRUCTURE_MESSAGE.INVALID_AMOUNT);
                    }
                }
                return true;
            })
        }
    },
    khau_tru: {
        isArray: {
            errorMessage: messages_2.SALARY_STRUCTURE_MESSAGE.DEDUCTION_IS_ARRAY
        },
        optional: true,
        custom: {
            options: (value) => __awaiter(void 0, void 0, void 0, function* () {
                for (const item of value) {
                    const id = yield database_service_1.default.SalaryPortion.findOne({ _id: new mongodb_1.ObjectId(item.id_phan_luong) });
                    if (!id)
                        throw new Error(`Salary not found!!!`);
                    if (item.so_tien < 0) {
                        throw new Error(messages_2.SALARY_STRUCTURE_MESSAGE.INVALID_AMOUNT);
                    }
                }
                return true;
            })
        }
    },
    hinh_thuc_chi_tra: {
        isObject: {
            errorMessage: 'Hình thức chi trả phải là một đối tượng.'
        },
        optional: true,
        custom: {
            options: (value) => __awaiter(void 0, void 0, void 0, function* () {
                const ht = yield database_service_1.default.FormOfPayment.findOne({ _id: new mongodb_1.ObjectId(value.id_hinh_thuc) });
                const tk = yield database_service_1.default.PayMentAccount.findOne({ _id: new mongodb_1.ObjectId(value.id_tai_khoan_chi_tra) });
                if (!ht || !tk)
                    throw new Error('Không thể tìm thấy id hình thưc hoặc id tài khoản chi trả!!!');
                if (!value.id_hinh_thuc || !value.id_tai_khoan_chi_tra) {
                    throw new Error(messages_2.SALARY_STRUCTURE_MESSAGE.PAYMENT_METHOD_IS_REQUIRED);
                }
                return true;
            })
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
