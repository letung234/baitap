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
var database_service_1 = require("~/services/database.service");
var mongodb_1 = require("mongodb");
var role_model_1 = require("~/models/schemas/role.model");
var Roleservice = /** @class */ (function () {
    function Roleservice() {
    }
    Roleservice.prototype.createRole = function (roleData) {
        return __awaiter(this, void 0, void 0, function () {
            var newRole, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        newRole = new role_model_1["default"](roleData);
                        return [4 /*yield*/, database_service_1["default"].Role.insertOne(newRole)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    Roleservice.prototype.createRoleValidate = function (name) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, database_service_1["default"].Role.findOne({ title: name, deleted: false })];
                    case 1:
                        result = _a.sent();
                        if (result) {
                            return [2 /*return*/, true];
                        }
                        return [2 /*return*/, false];
                }
            });
        });
    };
    Roleservice.prototype.updateRole = function (id, roleData) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, database_service_1["default"].Role.updateOne({ _id: new mongodb_1.ObjectId(id) }, { $set: roleData })];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    Roleservice.prototype.EditRoleValidate = function (title, id) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, database_service_1["default"].Role.findOne({
                            title: title,
                            deleted: false,
                            _id: { $ne: new mongodb_1.ObjectId(id) }
                        })];
                    case 1:
                        result = _a.sent();
                        if (result) {
                            return [2 /*return*/, true];
                        }
                        return [2 /*return*/, false];
                }
            });
        });
    };
    Roleservice.prototype.deleteRole = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, database_service_1["default"].Role.updateOne({ _id: new mongodb_1.ObjectId(id) }, { $set: { deleted: true } })];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    Roleservice.prototype.patchPermissions = function (permissions) {
        return __awaiter(this, void 0, void 0, function () {
            var _i, permissions_1, item;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _i = 0, permissions_1 = permissions;
                        _a.label = 1;
                    case 1:
                        if (!(_i < permissions_1.length)) return [3 /*break*/, 4];
                        item = permissions_1[_i];
                        return [4 /*yield*/, database_service_1["default"].Role.updateOne({ _id: new mongodb_1.ObjectId(item.id) }, {
                                $set: {
                                    permission: item.permissions
                                }
                            })];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return Roleservice;
}());
var roleService = new Roleservice();
exports["default"] = roleService;
