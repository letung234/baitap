"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostLoginUser = exports.DeleteUser = exports.PatchEditUsers = exports.PostLogoutUser = exports.PostCreateUsers = void 0;
const users_service_1 = __importDefault(require("../../services/users.service"));
const httpStatus_1 = __importDefault(require("../../constants/httpStatus"));
const crypto_1 = require("../../utils/crypto");
const database_service_1 = __importDefault(require("../../services/database.service"));
const PostCreateUsers = async (req, res) => {
    const data = { ...req.body };
    data.password = (0, crypto_1.hashPassword)(data.password);
    const result = await users_service_1.default.Register(data);
    console.log(result);
    return res.status(httpStatus_1.default.CREATED).json({ success: true });
};
exports.PostCreateUsers = PostCreateUsers;
const PostLogoutUser = async (req, res) => {
    res.clearCookie('access_token');
    res.clearCookie('refresh_token');
    const refreshToken = req.cookies?.refresh_token;
    await database_service_1.default.refreshTokens.deleteOne({ token: refreshToken });
    return res.status(httpStatus_1.default.OK).json({ success: true });
};
exports.PostLogoutUser = PostLogoutUser;
const PatchEditUsers = async (req, res) => {
    const { id } = req.params;
    const data = { ...req.body };
    if (data.password) {
        data.password = (0, crypto_1.hashPassword)(data.password);
    }
    const result = await users_service_1.default.Update(id, data);
    console.log(result);
    return res.status(httpStatus_1.default.OK).json({ success: true });
};
exports.PatchEditUsers = PatchEditUsers;
const DeleteUser = async (req, res) => {
    const { id } = req.params;
    const result = await users_service_1.default.Delete(id);
    return res.status(httpStatus_1.default.OK).json({ success: true });
};
exports.DeleteUser = DeleteUser;
const PostLoginUser = async (req, res) => {
    const user = req.user;
    const result = await users_service_1.default.Login({ user_id: user._id?.toString() });
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
    return res.status(httpStatus_1.default.OK).json({ success: true });
};
exports.PostLoginUser = PostLoginUser;
