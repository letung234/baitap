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
var dotenv_1 = require("dotenv");
var mongodb_1 = require("mongodb");
var jwt_1 = require("~/utils/jwt");
var database_service_1 = require("~/services/database.service");
var messages_1 = require("~/constants/messages");
var users_service_1 = require("~/services/users.service");
var httpStatus_1 = require("~/constants/httpStatus");
dotenv_1.config();
var authenticateToken = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var accessToken, refreshToken, isApiRequest, decoded, user, _a, err_1;
    var _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                accessToken = (_b = req.cookies) === null || _b === void 0 ? void 0 : _b.access_token;
                refreshToken = (_c = req.cookies) === null || _c === void 0 ? void 0 : _c.refresh_token;
                isApiRequest = req.headers.accept === 'application/json';
                if (!accessToken) {
                    if (isApiRequest) {
                        return [2 /*return*/, res
                                .status(httpStatus_1["default"].UNAUTHORIZED)
                                .json({ error: 'Unauthorized', message: messages_1.MESSAGES.ACCESS_TOKEN_IS_REQUIRED })];
                    }
                    else {
                        req.flash('error', messages_1.MESSAGES.ACCESS_TOKEN_IS_REQUIRED);
                        return [2 /*return*/, res.redirect('/users/login')];
                    }
                }
                _d.label = 1;
            case 1:
                _d.trys.push([1, 5, , 6]);
                return [4 /*yield*/, jwt_1.verifyToken({
                        token: accessToken,
                        secretOrPublicKey: process.env.JWT_SECRET_ACCESS_TOKEN
                    })];
            case 2:
                decoded = _d.sent();
                req.decoded_authorization = decoded;
                return [4 /*yield*/, database_service_1["default"].User.findOne({ deleted: false, _id: new mongodb_1.ObjectId(decoded.user_id) })];
            case 3:
                user = _d.sent();
                _a = res.locals;
                return [4 /*yield*/, database_service_1["default"].Role.findOne({ deleted: false, _id: new mongodb_1.ObjectId(user === null || user === void 0 ? void 0 : user.role_id) })];
            case 4:
                _a.role = _d.sent();
                return [2 /*return*/, next()];
            case 5:
                err_1 = _d.sent();
                if (err_1.name === 'TokenExpiredError') {
                    return [2 /*return*/, handleExpiredAccessToken(req, res, next, refreshToken, isApiRequest)];
                }
                else {
                    if (isApiRequest) {
                        return [2 /*return*/, res.status(401).json({ error: 'Unauthorized', message: err_1.name })];
                    }
                    else {
                        req.flash('error', err_1.name);
                        return [2 /*return*/, res.redirect('/users/login')];
                    }
                }
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
function handleExpiredAccessToken(req, res, next, refreshToken, isApiRequest) {
    return __awaiter(this, void 0, void 0, function () {
        var decoded_refresh_token, found_refresh_token, refreshError_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!refreshToken) {
                        if (isApiRequest) {
                            return [2 /*return*/, res
                                    .status(httpStatus_1["default"].UNAUTHORIZED)
                                    .json({ error: 'Unauthorized', message: messages_1.MESSAGES.REFRESH_TOKEN_IS_REQUIRED })];
                        }
                        else {
                            req.flash('error', messages_1.MESSAGES.REFRESH_TOKEN_IS_REQUIRED);
                            return [2 /*return*/, res.redirect('/users/login')];
                        }
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 7, , 8]);
                    return [4 /*yield*/, jwt_1.verifyToken({
                            token: refreshToken,
                            secretOrPublicKey: process.env.JWT_SECRET_REFRESH_TOKEN
                        })];
                case 2:
                    decoded_refresh_token = _a.sent();
                    return [4 /*yield*/, database_service_1["default"].refreshTokens.findOne({ token: refreshToken })];
                case 3:
                    found_refresh_token = _a.sent();
                    if (!(decoded_refresh_token && found_refresh_token)) return [3 /*break*/, 5];
                    return [4 /*yield*/, refreshAccessToken(req, res, decoded_refresh_token)];
                case 4:
                    _a.sent();
                    return [2 /*return*/, next()];
                case 5:
                    if (isApiRequest) {
                        return [2 /*return*/, res
                                .status(httpStatus_1["default"].UNAUTHORIZED)
                                .json({ error: 'Unauthorized', message: messages_1.MESSAGES.USED_REFRESH_TOKEN_OR_NOT_EXIST })];
                    }
                    else {
                        req.flash('error', messages_1.MESSAGES.USED_REFRESH_TOKEN_OR_NOT_EXIST);
                        return [2 /*return*/, res.redirect('/users/login')];
                    }
                    _a.label = 6;
                case 6: return [3 /*break*/, 8];
                case 7:
                    refreshError_1 = _a.sent();
                    if (isApiRequest) {
                        return [2 /*return*/, res.status(httpStatus_1["default"].UNAUTHORIZED).json({ error: 'Unauthorized', message: refreshError_1.name })];
                    }
                    else {
                        req.flash('error', refreshError_1.name);
                        return [2 /*return*/, res.redirect('/users/login')];
                    }
                    return [3 /*break*/, 8];
                case 8: return [2 /*return*/];
            }
        });
    });
}
function refreshAccessToken(req, res, decoded_refresh_token) {
    return __awaiter(this, void 0, void 0, function () {
        var user_id, exp, result, user, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    user_id = decoded_refresh_token.user_id, exp = decoded_refresh_token.exp;
                    return [4 /*yield*/, users_service_1["default"].refreshToken({ user_id: user_id, refresh_token: req.cookies.refresh_token, exp: exp })];
                case 1:
                    result = _b.sent();
                    return [4 /*yield*/, database_service_1["default"].User.findOne({
                            deleted: false,
                            _id: new mongodb_1.ObjectId(decoded_refresh_token.user_id)
                        })];
                case 2:
                    user = _b.sent();
                    _a = res.locals;
                    return [4 /*yield*/, database_service_1["default"].Role.findOne({ deleted: false, _id: new mongodb_1.ObjectId(user === null || user === void 0 ? void 0 : user.role_id) })];
                case 3:
                    _a.role = _b.sent();
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
                    return [2 /*return*/];
            }
        });
    });
}
exports["default"] = authenticateToken;
