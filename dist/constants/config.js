"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isProduction = exports.envConfig = void 0;
const dotenv_1 = require("dotenv");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const env = process.env.NODE_ENV || 'development';
const envFilename = `.env.${env}`;
if (!fs_1.default.existsSync(path_1.default.resolve(envFilename))) {
    console.log(`Không tìm thấy file môi trường ${envFilename}`);
    console.log(`Vui lòng tạo file ${envFilename} và tham khảo nội dung ở file .env.example`);
    process.exit(1);
}
else {
    console.log(`Phát hiện NODE_ENV = ${env}, app sẽ dùng file môi trường ${envFilename}`);
}
(0, dotenv_1.config)({ path: envFilename });
exports.envConfig = {
    port: process.env.PORT || 4000,
    dbName: process.env.DB_NAME,
    dbUsername: process.env.DB_USERNAME,
    dbPassword: process.env.DB_PASSWORD,
    sessionCookieKey: process.env.KEY_SESSION_COOKIE,
    cloudinary: {
        cloudName: process.env.CLOUD_NAME,
        apiKey: process.env.API_KEY,
        apiSecret: process.env.API_SECRET
    },
    passwordSecret: process.env.PASSWORD_SECRET,
    jwtSecretAccessToken: process.env.JWT_SECRET_ACCESS_TOKEN,
    jwtSecretRefreshToken: process.env.JWT_SECRET_REFRESH_TOKEN,
    refreshTokenExpiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN,
    accessTokenExpiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN
};
const requiredEnvVars = [
    'DB_NAME',
    'DB_USERNAME',
    'DB_PASSWORD',
    'KEY_SESSION_COOKIE',
    'PASSWORD_SECRET',
    'CLOUD_NAME',
    'API_KEY',
    'API_SECRET',
    'JWT_SECRET_ACCESS_TOKEN',
    'JWT_SECRET_REFRESH_TOKEN',
    'REFRESH_TOKEN_EXPIRES_IN',
    'ACCESS_TOKEN_EXPIRES_IN'
];
requiredEnvVars.forEach((key) => {
    if (!process.env[key]) {
        console.warn(`Warning: Missing environment variable ${key}`);
    }
});
exports.isProduction = env === 'production';
