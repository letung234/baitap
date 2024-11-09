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
var jwt_1 = require("../utils/jwt");
var database_service_1 = require("~/services/database.service");
var mongodb_1 = require("mongodb");
var refreshtoken_model_1 = require("~/models/schemas/refreshtoken.model");
var user_model_1 = require("~/models/schemas/user.model");
var config_1 = require("~/constants/config");
var jwt_2 = require("~/utils/jwt");
var Service = /** @class */ (function () {
    function Service() {
    }
    Service.prototype.refreshToken = function (_a) {
        var user_id = _a.user_id, refresh_token = _a.refresh_token, exp = _a.exp;
        return __awaiter(this, void 0, void 0, function () {
            var _b, new_access_token, new_refresh_token, decoded_refresh_token;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, Promise.all([
                            jwt_1.signAccessToken({ user_id: user_id }),
                            jwt_1.signRefreshToken({ user_id: user_id, exp: exp }),
                            database_service_1["default"].refreshTokens.deleteOne({ token: refresh_token })
                        ])];
                    case 1:
                        _b = _c.sent(), new_access_token = _b[0], new_refresh_token = _b[1];
                        return [4 /*yield*/, jwt_1.decodeRefreshToken(new_refresh_token)];
                    case 2:
                        decoded_refresh_token = _c.sent();
                        return [4 /*yield*/, database_service_1["default"].refreshTokens.insertOne(new refreshtoken_model_1["default"]({
                                user_id: new mongodb_1.ObjectId(user_id),
                                token: new_refresh_token,
                                iat: decoded_refresh_token.iat,
                                exp: decoded_refresh_token.exp
                            }))];
                    case 3:
                        _c.sent();
                        return [2 /*return*/, {
                                access_token: new_access_token,
                                refresh_token: new_refresh_token
                            }];
                }
            });
        });
    };
    Service.prototype.signAccessToken = function (_a) {
        var user_id = _a.user_id;
        return jwt_2.signToken({
            payload: {
                user_id: user_id
            },
            privateKey: config_1.envConfig.jwtSecretAccessToken,
            options: {
                expiresIn: config_1.envConfig.accessTokenExpiresIn
            }
        });
    };
    Service.prototype.signRefreshToken = function (_a) {
        var user_id = _a.user_id, exp = _a.exp;
        if (exp) {
            return jwt_2.signToken({
                payload: {
                    user_id: user_id,
                    exp: exp
                },
                privateKey: config_1.envConfig.jwtSecretRefreshToken
            });
        }
        return jwt_2.signToken({
            payload: {
                user_id: user_id
            },
            privateKey: config_1.envConfig.jwtSecretRefreshToken,
            options: {
                expiresIn: config_1.envConfig.refreshTokenExpiresIn
            }
        });
    };
    Service.prototype.signAccessAndRefreshToken = function (_a) {
        var user_id = _a.user_id;
        return Promise.all([this.signAccessToken({ user_id: user_id }), this.signRefreshToken({ user_id: user_id })]);
    };
    Service.prototype.decodeRefreshToken = function (refresh_token) {
        return jwt_2.verifyToken({
            token: refresh_token,
            secretOrPublicKey: config_1.envConfig.jwtSecretRefreshToken
        });
    };
    Service.prototype.Register = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var user, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        user = new user_model_1["default"](data);
                        return [4 /*yield*/, database_service_1["default"].User.insertOne(user)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    Service.prototype.Update = function (id, data) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, database_service_1["default"].User.updateOne({ _id: new mongodb_1.ObjectId(id) }, { $set: data })];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    Service.prototype.Delete = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, database_service_1["default"].User.updateOne({ _id: new mongodb_1.ObjectId(id) }, { $set: { deleted: true, deleted_at: new Date() } })];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    Service.prototype.Login = function (_a) {
        var user_id = _a.user_id;
        return __awaiter(this, void 0, void 0, function () {
            var _b, access_token, refresh_token, _c, iat, exp;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0: return [4 /*yield*/, this.signAccessAndRefreshToken({
                            user_id: user_id
                        })];
                    case 1:
                        _b = _d.sent(), access_token = _b[0], refresh_token = _b[1];
                        return [4 /*yield*/, this.decodeRefreshToken(refresh_token)];
                    case 2:
                        _c = _d.sent(), iat = _c.iat, exp = _c.exp;
                        return [4 /*yield*/, database_service_1["default"].refreshTokens.insertOne(new refreshtoken_model_1["default"]({ user_id: new mongodb_1.ObjectId(user_id), token: refresh_token, iat: iat, exp: exp }))];
                    case 3:
                        _d.sent();
                        return [2 /*return*/, {
                                access_token: access_token,
                                refresh_token: refresh_token
                            }];
                }
            });
        });
    };
    return Service;
}());
var UsersService = new Service();
exports["default"] = UsersService;
