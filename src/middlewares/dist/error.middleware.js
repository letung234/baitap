"use strict";
exports.__esModule = true;
exports.defaultErrorHandler = void 0;
var lodash_1 = require("lodash");
var httpStatus_1 = require("~/constants/httpStatus");
var Errors_1 = require("~/models/Errors");
var lodash_2 = require("lodash");
exports.defaultErrorHandler = function (err, req, res, next) {
    var _a;
    var isApiRequest = req.xhr || ((_a = req.headers.accept) === null || _a === void 0 ? void 0 : _a.includes('application/json')) || !lodash_2.isEmpty(req.body);
    if (err instanceof Errors_1.ErrorWithStatus) {
        if (isApiRequest) {
            return res.status(err.status).json(lodash_1.omit(err, ['status']));
        }
        else {
            return res.status(err.status).render('pages/error/error', {
                message: err.message,
                errorInfo: lodash_1.omit(err, ['stack'])
            });
        }
    }
    var finalError = {};
    Object.getOwnPropertyNames(err).forEach(function (key) {
        var _a, _b;
        if (!((_a = Object.getOwnPropertyDescriptor(err, key)) === null || _a === void 0 ? void 0 : _a.configurable) ||
            !((_b = Object.getOwnPropertyDescriptor(err, key)) === null || _b === void 0 ? void 0 : _b.writable)) {
            return;
        }
        finalError[key] = err[key];
    });
    if (isApiRequest) {
        return res.status(httpStatus_1["default"].INTERNAL_SERVER_ERROR).json({
            message: finalError.message,
            errorInfo: lodash_1.omit(finalError, ['stack'])
        });
    }
    else {
        return res.status(httpStatus_1["default"].INTERNAL_SERVER_ERROR).render('pages/error/error', {
            message: finalError.message,
            errorInfo: lodash_1.omit(finalError, ['stack'])
        });
    }
};
