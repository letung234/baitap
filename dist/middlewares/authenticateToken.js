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
const dotenv_1 = require("dotenv");
const mongodb_1 = require("mongodb");
const jwt_1 = require("~/utils/jwt");
const database_service_1 = __importDefault(require("~/services/database.service"));
const messages_1 = require("~/constants/messages");
const users_service_1 = __importDefault(require("~/services/users.service"));
const httpStatus_1 = __importDefault(require("~/constants/httpStatus"));
(0, dotenv_1.config)();
const authenticateToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const accessToken = (_a = req.cookies) === null || _a === void 0 ? void 0 : _a.access_token;
    const refreshToken = (_b = req.cookies) === null || _b === void 0 ? void 0 : _b.refresh_token;
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
        const decoded = yield (0, jwt_1.verifyToken)({
            token: accessToken,
            secretOrPublicKey: process.env.JWT_SECRET_ACCESS_TOKEN
        });
        req.decoded_authorization = decoded;
        const user = yield database_service_1.default.User.findOne({ deleted: false, _id: new mongodb_1.ObjectId(decoded.user_id) });
        res.locals.role = yield database_service_1.default.Role.findOne({ deleted: false, _id: new mongodb_1.ObjectId(user === null || user === void 0 ? void 0 : user.role_id) });
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
});
function handleExpiredAccessToken(req, res, next, refreshToken, isApiRequest) {
    return __awaiter(this, void 0, void 0, function* () {
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
            const decoded_refresh_token = yield (0, jwt_1.verifyToken)({
                token: refreshToken,
                secretOrPublicKey: process.env.JWT_SECRET_REFRESH_TOKEN
            });
            const found_refresh_token = yield database_service_1.default.refreshTokens.findOne({ token: refreshToken });
            if (decoded_refresh_token && found_refresh_token) {
                yield refreshAccessToken(req, res, decoded_refresh_token);
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
    });
}
function refreshAccessToken(req, res, decoded_refresh_token) {
    return __awaiter(this, void 0, void 0, function* () {
        const { user_id, exp } = decoded_refresh_token;
        const result = yield users_service_1.default.refreshToken({ user_id, refresh_token: req.cookies.refresh_token, exp });
        const user = yield database_service_1.default.User.findOne({
            deleted: false,
            _id: new mongodb_1.ObjectId(decoded_refresh_token.user_id)
        });
        res.locals.role = yield database_service_1.default.Role.findOne({ deleted: false, _id: new mongodb_1.ObjectId(user === null || user === void 0 ? void 0 : user.role_id) });
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
    });
}
exports.default = authenticateToken;
