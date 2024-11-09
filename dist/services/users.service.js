"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwt_1 = require("../utils/jwt");
const database_service_1 = __importDefault(require("../services/database.service"));
const mongodb_1 = require("mongodb");
const refreshtoken_model_1 = __importDefault(require("../models/schemas/refreshtoken.model"));
const user_model_1 = __importDefault(require("../models/schemas/user.model"));
const config_1 = require("../constants/config");
const jwt_2 = require("../utils/jwt");
class Service {
    async refreshToken({ user_id, refresh_token, exp }) {
        const [new_access_token, new_refresh_token] = await Promise.all([
            (0, jwt_1.signAccessToken)({ user_id }),
            (0, jwt_1.signRefreshToken)({ user_id, exp }),
            database_service_1.default.refreshTokens.deleteOne({ token: refresh_token })
        ]);
        const decoded_refresh_token = await (0, jwt_1.decodeRefreshToken)(new_refresh_token);
        await database_service_1.default.refreshTokens.insertOne(new refreshtoken_model_1.default({
            user_id: new mongodb_1.ObjectId(user_id),
            token: new_refresh_token,
            iat: decoded_refresh_token.iat,
            exp: decoded_refresh_token.exp
        }));
        return {
            access_token: new_access_token,
            refresh_token: new_refresh_token
        };
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
    async Register(data) {
        const user = new user_model_1.default(data);
        const result = await database_service_1.default.User.insertOne(user);
        return result;
    }
    async Update(id, data) {
        const result = await database_service_1.default.User.updateOne({ _id: new mongodb_1.ObjectId(id) }, { $set: data });
        return result;
    }
    async Delete(id) {
        const result = await database_service_1.default.User.updateOne({ _id: new mongodb_1.ObjectId(id) }, { $set: { deleted: true, deleted_at: new Date() } });
        return result;
    }
    async Login({ user_id }) {
        const [access_token, refresh_token] = await this.signAccessAndRefreshToken({
            user_id
        });
        const { iat, exp } = await this.decodeRefreshToken(refresh_token);
        await database_service_1.default.refreshTokens.insertOne(new refreshtoken_model_1.default({ user_id: new mongodb_1.ObjectId(user_id), token: refresh_token, iat, exp }));
        return {
            access_token,
            refresh_token
        };
    }
}
const UsersService = new Service();
exports.default = UsersService;
