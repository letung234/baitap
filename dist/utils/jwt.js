"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.signToken = void 0;
exports.signAccessToken = signAccessToken;
exports.signRefreshToken = signRefreshToken;
exports.signAccessAndRefreshToken = signAccessAndRefreshToken;
exports.decodeRefreshToken = decodeRefreshToken;
const dotenv_1 = require("dotenv");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const enums_1 = require("../constants/enums");
const config_1 = require("../constants/config");
(0, dotenv_1.config)();
const signToken = ({ payload, privateKey, options = {
    algorithm: 'HS256'
} }) => {
    return new Promise((resolve, reject) => {
        jsonwebtoken_1.default.sign(payload, privateKey, options, (error, token) => {
            if (error) {
                throw reject(error);
            }
            resolve(token);
        });
    });
};
exports.signToken = signToken;
const verifyToken = ({ token, secretOrPublicKey }) => {
    return new Promise((resolve, reject) => {
        jsonwebtoken_1.default.verify(token, secretOrPublicKey, (error, decoded) => {
            if (error) {
                throw reject(error);
            }
            resolve(decoded);
        });
    });
};
exports.verifyToken = verifyToken;
function signAccessToken({ user_id }) {
    return (0, exports.signToken)({
        payload: {
            user_id,
            token_type: enums_1.TokenType.AccessToken
        },
        privateKey: config_1.envConfig.jwtSecretAccessToken,
        options: {
            expiresIn: config_1.envConfig.accessTokenExpiresIn
        }
    });
}
function signRefreshToken({ user_id, exp }) {
    if (exp) {
        return (0, exports.signToken)({
            payload: {
                user_id,
                token_type: enums_1.TokenType.RefreshToken,
                exp
            },
            privateKey: config_1.envConfig.jwtSecretRefreshToken
        });
    }
    return (0, exports.signToken)({
        payload: {
            user_id,
            token_type: enums_1.TokenType.RefreshToken
        },
        privateKey: config_1.envConfig.jwtSecretRefreshToken,
        options: {
            expiresIn: config_1.envConfig.refreshTokenExpiresIn
        }
    });
}
function signAccessAndRefreshToken({ user_id }) {
    return Promise.all([signAccessToken({ user_id }), signRefreshToken({ user_id })]);
}
function decodeRefreshToken(refresh_token) {
    return (0, exports.verifyToken)({
        token: refresh_token,
        secretOrPublicKey: config_1.envConfig.jwtSecretRefreshToken
    });
}
