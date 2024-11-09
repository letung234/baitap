"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const mongodb_1 = require("mongodb");
const jwt_1 = require("../utils/jwt");
const database_service_1 = __importDefault(require("../services/database.service"));
const messages_1 = require("../constants/messages");
const users_service_1 = __importDefault(require("../services/users.service"));
const httpStatus_1 = __importDefault(require("../constants/httpStatus"));
(0, dotenv_1.config)();
const authenticateToken = async (req, res, next) => {
    const accessToken = req.cookies?.access_token;
    const refreshToken = req.cookies?.refresh_token;
    const isApiRequest = req.headers.accept === 'application/json';
    if (!accessToken) {
        if (isApiRequest) {
            return res
                .status(httpStatus_1.default.UNAUTHORIZED)
                .json({ error: 'Unauthorized', message: messages_1.MESSAGES.ACCESS_TOKEN_IS_REQUIRED });
        }
        else {
            req.flash('error', messages_1.MESSAGES.ACCESS_TOKEN_IS_REQUIRED);
            return res.redirect('/users/login');
        }
    }
    try {
        const decoded = await (0, jwt_1.verifyToken)({
            token: accessToken,
            secretOrPublicKey: process.env.JWT_SECRET_ACCESS_TOKEN
        });
        req.decoded_authorization = decoded;
        const user = await database_service_1.default.User.findOne({ deleted: false, _id: new mongodb_1.ObjectId(decoded.user_id) });
        res.locals.role = await database_service_1.default.Role.findOne({ deleted: false, _id: new mongodb_1.ObjectId(user?.role_id) });
        return next();
    }
    catch (err) {
        if (err.name === 'TokenExpiredError') {
            return handleExpiredAccessToken(req, res, next, refreshToken, isApiRequest);
        }
        else {
            if (isApiRequest) {
                return res.status(401).json({ error: 'Unauthorized', message: err.name });
            }
            else {
                req.flash('error', err.name);
                return res.redirect('/users/login');
            }
        }
    }
};
async function handleExpiredAccessToken(req, res, next, refreshToken, isApiRequest) {
    if (!refreshToken) {
        if (isApiRequest) {
            return res
                .status(httpStatus_1.default.UNAUTHORIZED)
                .json({ error: 'Unauthorized', message: messages_1.MESSAGES.REFRESH_TOKEN_IS_REQUIRED });
        }
        else {
            req.flash('error', messages_1.MESSAGES.REFRESH_TOKEN_IS_REQUIRED);
            return res.redirect('/users/login');
        }
    }
    try {
        const decoded_refresh_token = await (0, jwt_1.verifyToken)({
            token: refreshToken,
            secretOrPublicKey: process.env.JWT_SECRET_REFRESH_TOKEN
        });
        const found_refresh_token = await database_service_1.default.refreshTokens.findOne({ token: refreshToken });
        if (decoded_refresh_token && found_refresh_token) {
            await refreshAccessToken(req, res, decoded_refresh_token);
            return next();
        }
        else {
            if (isApiRequest) {
                return res
                    .status(httpStatus_1.default.UNAUTHORIZED)
                    .json({ error: 'Unauthorized', message: messages_1.MESSAGES.USED_REFRESH_TOKEN_OR_NOT_EXIST });
            }
            else {
                req.flash('error', messages_1.MESSAGES.USED_REFRESH_TOKEN_OR_NOT_EXIST);
                return res.redirect('/users/login');
            }
        }
    }
    catch (refreshError) {
        if (isApiRequest) {
            return res.status(httpStatus_1.default.UNAUTHORIZED).json({ error: 'Unauthorized', message: refreshError.name });
        }
        else {
            req.flash('error', refreshError.name);
            return res.redirect('/users/login');
        }
    }
}
async function refreshAccessToken(req, res, decoded_refresh_token) {
    const { user_id, exp } = decoded_refresh_token;
    const result = await users_service_1.default.refreshToken({ user_id, refresh_token: req.cookies.refresh_token, exp });
    const user = await database_service_1.default.User.findOne({
        deleted: false,
        _id: new mongodb_1.ObjectId(decoded_refresh_token.user_id)
    });
    res.locals.role = await database_service_1.default.Role.findOne({ deleted: false, _id: new mongodb_1.ObjectId(user?.role_id) });
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
}
exports.default = authenticateToken;
