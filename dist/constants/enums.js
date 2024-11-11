"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.salaryType = exports.ProductStatus = exports.MediaType = exports.TokenType = exports.UserVerifyStatus = void 0;
var UserVerifyStatus;
(function (UserVerifyStatus) {
    UserVerifyStatus[UserVerifyStatus["Unverified"] = 0] = "Unverified";
    UserVerifyStatus[UserVerifyStatus["Verified"] = 1] = "Verified";
    UserVerifyStatus[UserVerifyStatus["Banned"] = 2] = "Banned";
})(UserVerifyStatus || (exports.UserVerifyStatus = UserVerifyStatus = {}));
var TokenType;
(function (TokenType) {
    TokenType[TokenType["AccessToken"] = 0] = "AccessToken";
    TokenType[TokenType["RefreshToken"] = 1] = "RefreshToken";
})(TokenType || (exports.TokenType = TokenType = {}));
var MediaType;
(function (MediaType) {
    MediaType[MediaType["Image"] = 0] = "Image";
    MediaType[MediaType["Video"] = 1] = "Video";
    MediaType[MediaType["HLS"] = 2] = "HLS";
})(MediaType || (exports.MediaType = MediaType = {}));
var ProductStatus;
(function (ProductStatus) {
    ProductStatus[ProductStatus["Active"] = 0] = "Active";
    ProductStatus[ProductStatus["Inactive"] = 1] = "Inactive";
})(ProductStatus || (exports.ProductStatus = ProductStatus = {}));
var salaryType;
(function (salaryType) {
    salaryType[salaryType["ThuNhap"] = 0] = "ThuNhap";
    salaryType[salaryType["KhauTru"] = 1] = "KhauTru";
})(salaryType || (exports.salaryType = salaryType = {}));
