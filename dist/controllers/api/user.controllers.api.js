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
exports.PostLoginUser = exports.DeleteUser = exports.PatchEditUsers = exports.PostLogoutUser = exports.PostCreateUsers = void 0;
const users_service_1 = __importDefault(require("../../services/users.service"));
const httpStatus_1 = __importDefault(require("../../constants/httpStatus"));
const crypto_1 = require("../../utils/crypto");
const database_service_1 = __importDefault(require("../../services/database.service"));
const PostCreateUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = Object.assign({}, req.body);
    data.password = (0, crypto_1.hashPassword)(data.password);
    const result = yield users_service_1.default.Register(data);
    console.log(result);
    return res.status(httpStatus_1.default.CREATED).json({ success: true });
});
exports.PostCreateUsers = PostCreateUsers;
const PostLogoutUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    res.clearCookie('access_token');
    res.clearCookie('refresh_token');
    const refreshToken = (_a = req.cookies) === null || _a === void 0 ? void 0 : _a.refresh_token;
    yield database_service_1.default.refreshTokens.deleteOne({ token: refreshToken });
    return res.status(httpStatus_1.default.OK).json({ success: true });
});
exports.PostLogoutUser = PostLogoutUser;
const PatchEditUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const data = Object.assign({}, req.body);
    console.log(data.password);
    if (data.password) {
        data.password = (0, crypto_1.hashPassword)(data.password);
    }
    console.log(data);
    const result = yield users_service_1.default.Update(id, data);
    console.log(result);
    return res.status(httpStatus_1.default.OK).json({ success: true });
});
exports.PatchEditUsers = PatchEditUsers;
const DeleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield users_service_1.default.Delete(id);
    return res.status(httpStatus_1.default.OK).json({ success: true });
});
exports.DeleteUser = DeleteUser;
const PostLoginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const user = req.user;
    const result = yield users_service_1.default.Login({ user_id: (_a = user._id) === null || _a === void 0 ? void 0 : _a.toString() });
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
});
exports.PostLoginUser = PostLoginUser;
