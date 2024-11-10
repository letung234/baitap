"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetPermissionController = exports.GetEditController = exports.GetCreateController = exports.GetIndexController = void 0;
const database_service_1 = __importDefault(require("../services/database.service"));
const mongodb_1 = require("mongodb");
// [GET] /role
const GetIndexController = async (req, res) => {
    const records = await database_service_1.default.Role.find({ deleted: false }).toArray();
    res.render('pages/role/index', {
        pageTitle: 'Danh sách phân quyền',
        records
    });
};
exports.GetIndexController = GetIndexController;
// [GET] /create
const GetCreateController = async (req, res) => {
    res.render('pages/role/create', {
        pageTitle: 'Thêm mới phân quyền'
    });
};
exports.GetCreateController = GetCreateController;
// [GET] /edit/:id
const GetEditController = async (req, res) => {
    const id = req.params.id;
    const record = await database_service_1.default.Role.findOne({ _id: new mongodb_1.ObjectId(id), deleted: false });
    res.render('pages/role/edit', {
        pageTitle: 'Sửa phân quyền',
        record
    });
};
exports.GetEditController = GetEditController;
// [GET] /permission
const GetPermissionController = async (req, res) => {
    const records = await database_service_1.default.Role.find({ deleted: false }).toArray();
    res.render('pages/role/permission', {
        pageTitle: 'Phân quyền hệ thống',
        records
    });
};
exports.GetPermissionController = GetPermissionController;
