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
const jwt_1 = require("../utils/jwt");
const database_service_1 = __importDefault(require("~/services/database.service"));
const mongodb_1 = require("mongodb");
const refreshtoken_model_1 = __importDefault(require("~/models/schemas/refreshtoken.model"));
const user_model_1 = __importDefault(require("~/models/schemas/user.model"));
const config_1 = require("~/constants/config");
const jwt_2 = require("~/utils/jwt");
class Service {
    refreshToken(_a) {
        return __awaiter(this, arguments, void 0, function* ({ user_id, refresh_token, exp }) {
            const [new_access_token, new_refresh_token] = yield Promise.all([
                (0, jwt_1.signAccessToken)({ user_id }),
                (0, jwt_1.signRefreshToken)({ user_id, exp }),
                database_service_1.default.refreshTokens.deleteOne({ token: refresh_token })
            ]);
            const decoded_refresh_token = yield (0, jwt_1.decodeRefreshToken)(new_refresh_token);
            yield database_service_1.default.refreshTokens.insertOne(new refreshtoken_model_1.default({
                user_id: new mongodb_1.ObjectId(user_id),
                token: new_refresh_token,
                iat: decoded_refresh_token.iat,
                exp: decoded_refresh_token.exp
            }));
            return {
                access_token: new_access_token,
                refresh_token: new_refresh_token
            };
        });
    }
    signAccessToken({ user_id }) {
        return (0, jwt_2.signToken)({
            payload: {
                user_id
            },
            privateKey: config_1.envConfig.jwtSecretAccessToken,
            options: {
                expiresIn: config_1.envConfig.accessTokenExpiresIn
            }
        });
    }
    signRefreshToken({ user_id, exp }) {
        if (exp) {
            return (0, jwt_2.signToken)({
                payload: {
                    user_id,
                    exp
                },
                privateKey: config_1.envConfig.jwtSecretRefreshToken
            });
        }
        return (0, jwt_2.signToken)({
            payload: {
                user_id
            },
            privateKey: config_1.envConfig.jwtSecretRefreshToken,
            options: {
                expiresIn: config_1.envConfig.refreshTokenExpiresIn
            }
        });
    }
    signAccessAndRefreshToken({ user_id }) {
        return Promise.all([this.signAccessToken({ user_id }), this.signRefreshToken({ user_id })]);
    }
    decodeRefreshToken(refresh_token) {
        return (0, jwt_2.verifyToken)({
            token: refresh_token,
            secretOrPublicKey: config_1.envConfig.jwtSecretRefreshToken
        });
    }
    Register(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = new user_model_1.default(data);
            const result = yield database_service_1.default.User.insertOne(user);
            return result;
        });
    }
    Update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield database_service_1.default.User.updateOne({ _id: new mongodb_1.ObjectId(id) }, { $set: data });
            return result;
        });
    }
    Delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield database_service_1.default.User.updateOne({ _id: new mongodb_1.ObjectId(id) }, { $set: { deleted: true, deleted_at: new Date() } });
            return result;
        });
    }
    Login(_a) {
        return __awaiter(this, arguments, void 0, function* ({ user_id }) {
            const [access_token, refresh_token] = yield this.signAccessAndRefreshToken({
                user_id
            });
            const { iat, exp } = yield this.decodeRefreshToken(refresh_token);
            yield database_service_1.default.refreshTokens.insertOne(new refreshtoken_model_1.default({ user_id: new mongodb_1.ObjectId(user_id), token: refresh_token, iat, exp }));
            return {
                access_token,
                refresh_token
            };
        });
    }
}
const UsersService = new Service();
exports.default = UsersService;
