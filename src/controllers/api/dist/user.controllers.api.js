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
exports.PostLoginUser = exports.DeleteUser = exports.PatchEditUsers = exports.PostLogoutUser = exports.PostCreateUsers = void 0;
var users_service_1 = require("~/services/users.service");
var httpStatus_1 = require("~/constants/httpStatus");
var crypto_1 = require("~/utils/crypto");
var database_service_1 = require("~/services/database.service");
exports.PostCreateUsers = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var data, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                data = __assign({}, req.body);
                data.password = crypto_1.hashPassword(data.password);
                return [4 /*yield*/, users_service_1["default"].Register(data)];
            case 1:
                result = _a.sent();
                console.log(result);
                return [2 /*return*/, res.status(httpStatus_1["default"].CREATED).json({ success: true })];
        }
    });
}); };
exports.PostLogoutUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var refreshToken;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                res.clearCookie('access_token');
                res.clearCookie('refresh_token');
                refreshToken = (_a = req.cookies) === null || _a === void 0 ? void 0 : _a.refresh_token;
                return [4 /*yield*/, database_service_1["default"].refreshTokens.deleteOne({ token: refreshToken })];
            case 1:
                _b.sent();
                return [2 /*return*/, res.status(httpStatus_1["default"].OK).json({ success: true })];
        }
    });
}); };
exports.PatchEditUsers = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, data, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                data = __assign({}, req.body);
                if (data.password) {
                    data.password = crypto_1.hashPassword(data.password);
                }
                return [4 /*yield*/, users_service_1["default"].Update(id, data)];
            case 1:
                result = _a.sent();
                console.log(result);
                return [2 /*return*/, res.status(httpStatus_1["default"].OK).json({ success: true })];
        }
    });
}); };
exports.DeleteUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                return [4 /*yield*/, users_service_1["default"].Delete(id)];
            case 1:
                result = _a.sent();
                return [2 /*return*/, res.status(httpStatus_1["default"].OK).json({ success: true })];
        }
    });
}); };
exports.PostLoginUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, result;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                user = req.user;
                return [4 /*yield*/, users_service_1["default"].Login({ user_id: (_a = user._id) === null || _a === void 0 ? void 0 : _a.toString() })];
            case 1:
                result = _b.sent();
                res.cookie('access_token', result.access_token, {
                    maxAge: 1000 * 60 * 60 * 24 * 7,
                    httpOnly: true,
                    sameSite: 'strict'
                });
                res.cookie('refresh_token', result.refresh_token, {
                    maxAge: 1000 * 60 * 60 * 24 * 7,
                    httpOnly: true,
                    sameSite: 'strict'
                });
                return [2 /*return*/, res.status(httpStatus_1["default"].OK).json({ success: true })];
        }
    });
}); };
