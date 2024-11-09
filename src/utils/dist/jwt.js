"use strict";
exports.__esModule = true;
exports.decodeRefreshToken = exports.signAccessAndRefreshToken = exports.signRefreshToken = exports.signAccessToken = exports.verifyToken = exports.signToken = void 0;
var dotenv_1 = require("dotenv");
var jsonwebtoken_1 = require("jsonwebtoken");
var enums_1 = require("~/constants/enums");
var config_1 = require("~/constants/config");
dotenv_1.config();
exports.signToken = function (_a) {
    var payload = _a.payload, privateKey = _a.privateKey, _b = _a.options, options = _b === void 0 ? {
        algorithm: 'HS256'
    } : _b;
    return new Promise(function (resolve, reject) {
        jsonwebtoken_1["default"].sign(payload, privateKey, options, function (error, token) {
            if (error) {
                throw reject(error);
            }
            resolve(token);
        });
    });
};
exports.verifyToken = function (_a) {
    var token = _a.token, secretOrPublicKey = _a.secretOrPublicKey;
    return new Promise(function (resolve, reject) {
        jsonwebtoken_1["default"].verify(token, secretOrPublicKey, function (error, decoded) {
            if (error) {
                throw reject(error);
            }
            resolve(decoded);
        });
    });
};
function signAccessToken(_a) {
    var user_id = _a.user_id;
    return exports.signToken({
        payload: {
            user_id: user_id,
            token_type: enums_1.TokenType.AccessToken
        },
        privateKey: config_1.envConfig.jwtSecretAccessToken,
        options: {
            expiresIn: config_1.envConfig.accessTokenExpiresIn
        }
    });
}
exports.signAccessToken = signAccessToken;
function signRefreshToken(_a) {
    var user_id = _a.user_id, exp = _a.exp;
    if (exp) {
        return exports.signToken({
            payload: {
                user_id: user_id,
                token_type: enums_1.TokenType.RefreshToken,
                exp: exp
            },
            privateKey: config_1.envConfig.jwtSecretRefreshToken
        });
    }
    return exports.signToken({
        payload: {
            user_id: user_id,
            token_type: enums_1.TokenType.RefreshToken
        },
        privateKey: config_1.envConfig.jwtSecretRefreshToken,
        options: {
            expiresIn: config_1.envConfig.refreshTokenExpiresIn
        }
    });
}
exports.signRefreshToken = signRefreshToken;
function signAccessAndRefreshToken(_a) {
    var user_id = _a.user_id;
    return Promise.all([signAccessToken({ user_id: user_id }), signRefreshToken({ user_id: user_id })]);
}
exports.signAccessAndRefreshToken = signAccessAndRefreshToken;
function decodeRefreshToken(refresh_token) {
    return exports.verifyToken({
        token: refresh_token,
        secretOrPublicKey: config_1.envConfig.jwtSecretRefreshToken
    });
}
exports.decodeRefreshToken = decodeRefreshToken;
