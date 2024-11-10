"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditUserController = exports.CreateUserController = exports.GetUserController = exports.GetLoginController = void 0;
const mongodb_1 = require("mongodb");
const database_service_1 = __importDefault(require("../services/database.service"));
// [GET] /users/login
const GetLoginController = async (req, res) => {
    res.render('pages/user/login', {
        pageTitle: 'Đăng Nhập'
    });
};
exports.GetLoginController = GetLoginController;
// [GET] /users
const GetUserController = async (req, res) => {
    const users = await database_service_1.default.User.find({ deleted: false }).project({ password: 0 }).toArray();
    for (const user of users) {
        const role = await database_service_1.default.Role.findOne({
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
};
exports.GetUserController = GetUserController;
// [GET] /users/create
const CreateUserController = async (req, res) => {
    const roles = await database_service_1.default.Role.find({ deleted: false }).toArray();
    res.render('pages/user/create', {
        pageTitle: 'Tạo Tài Khoản',
        roles
    });
};
exports.CreateUserController = CreateUserController;
// [GET] /users/edit
const EditUserController = async (req, res) => {
    const { id } = req.params;
    const user = await database_service_1.default.User.findOne({ _id: new mongodb_1.ObjectId(id), deleted: false });
    const roles = await database_service_1.default.Role.find({ deleted: false }).toArray();
    res.render('pages/user/edit', {
        pageTitle: 'Tạo Tài Khoản',
        roles,
        user
    });
};
exports.EditUserController = EditUserController;
