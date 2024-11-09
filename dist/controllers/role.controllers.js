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
exports.GetPermissionController = exports.GetEditController = exports.GetCreateController = exports.GetIndexController = void 0;
const database_service_1 = __importDefault(require("../services/database.service"));
const mongodb_1 = require("mongodb");
// [GET] /role
const GetIndexController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const records = yield database_service_1.default.Role.find({ deleted: false }).toArray();
    res.render('pages/role/index', {
        pageTitle: 'Danh sách phân quyền',
        records
    });
});
exports.GetIndexController = GetIndexController;
// [GET] /create
const GetCreateController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.render('pages/role/create', {
        pageTitle: 'Thêm mới phân quyền'
    });
});
exports.GetCreateController = GetCreateController;
// [GET] /edit/:id
const GetEditController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const record = yield database_service_1.default.Role.findOne({ _id: new mongodb_1.ObjectId(id), deleted: false });
    res.render('pages/role/edit', {
        pageTitle: 'Sửa phân quyền',
        record
    });
});
exports.GetEditController = GetEditController;
// [GET] /permission
const GetPermissionController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const records = yield database_service_1.default.Role.find({ deleted: false }).toArray();
    res.render('pages/role/permission', {
        pageTitle: 'Phân quyền hệ thống',
        records
    });
});
exports.GetPermissionController = GetPermissionController;
