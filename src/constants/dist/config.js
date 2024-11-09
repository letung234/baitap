"use strict";
exports.__esModule = true;
exports.isProduction = exports.envConfig = void 0;
var dotenv_1 = require("dotenv");
var fs_1 = require("fs");
var path_1 = require("path");
var env = process.env.NODE_ENV || 'development';
var envFilename = ".env." + env;
if (!fs_1["default"].existsSync(path_1["default"].resolve(envFilename))) {
    console.log("Kh\u00F4ng t\u00ECm th\u1EA5y file m\u00F4i tr\u01B0\u1EDDng " + envFilename);
    console.log("Vui l\u00F2ng t\u1EA1o file " + envFilename + " v\u00E0 tham kh\u1EA3o n\u1ED9i dung \u1EDF file .env.example");
    process.exit(1);
}
else {
    console.log("Ph\u00E1t hi\u1EC7n NODE_ENV = " + env + ", app s\u1EBD d\u00F9ng file m\u00F4i tr\u01B0\u1EDDng " + envFilename);
}
dotenv_1.config({ path: envFilename });
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
var requiredEnvVars = [
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
requiredEnvVars.forEach(function (key) {
    if (!process.env[key]) {
        console.warn("Warning: Missing environment variable " + key);
    }
});
exports.isProduction = env === 'production';
