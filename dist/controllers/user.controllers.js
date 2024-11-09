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
exports.EditUserController = exports.CreateUserController = exports.GetUserController = exports.GetLoginController = void 0;
const mongodb_1 = require("mongodb");
const database_service_1 = __importDefault(require("~/services/database.service"));
// [GET] /users/login
const GetLoginController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.render('pages/user/login', {
        pageTitle: 'Đăng Nhập'
    });
});
exports.GetLoginController = GetLoginController;
// [GET] /users
const GetUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield database_service_1.default.User.find({ deleted: false }).project({ password: 0 }).toArray();
    for (const user of users) {
        const role = yield database_service_1.default.Role.findOne({
            _id: new mongodb_1.ObjectId(user.role_id),
            deleted: false
        });
        user.role = role;
    }
    console.log(users);
    res.render('pages/user/index', {
        pageTitle: 'Danh sách tài khoản',
        records: users
    });
});
exports.GetUserController = GetUserController;
// [GET] /users/create
const CreateUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const roles = yield database_service_1.default.Role.find({ deleted: false }).toArray();
    res.render('pages/user/create', {
        pageTitle: 'Tạo Tài Khoản',
        roles
    });
});
exports.CreateUserController = CreateUserController;
// [GET] /users/edit
const EditUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const user = yield database_service_1.default.User.findOne({ _id: new mongodb_1.ObjectId(id), deleted: false });
    const roles = yield database_service_1.default.Role.find({ deleted: false }).toArray();
    res.render('pages/user/edit', {
        pageTitle: 'Tạo Tài Khoản',
        roles,
        user
    });
});
exports.EditUserController = EditUserController;
