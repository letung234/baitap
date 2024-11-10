"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultErrorHandler = void 0;
const lodash_1 = require("lodash");
const httpStatus_1 = __importDefault(require("../constants/httpStatus"));
const Errors_1 = require("../models/Errors");
const lodash_2 = require("lodash");
const defaultErrorHandler = (err, req, res, next) => {
    const isApiRequest = req.xhr || req.headers.accept?.includes('application/json') || !(0, lodash_2.isEmpty)(req.body);
    if (err instanceof Errors_1.ErrorWithStatus) {
        if (isApiRequest) {
            return res.status(err.status).json((0, lodash_1.omit)(err, ['status']));
        }
        else {
            return res.status(err.status).render('pages/error/error', {
                message: err.message,
                errorInfo: (0, lodash_1.omit)(err, ['stack'])
            });
        }
    }
    const finalError = {};
    Object.getOwnPropertyNames(err).forEach((key) => {
        if (!Object.getOwnPropertyDescriptor(err, key)?.configurable ||
            !Object.getOwnPropertyDescriptor(err, key)?.writable) {
            return;
        }
        finalError[key] = err[key];
    });
    if (isApiRequest) {
        return res.status(httpStatus_1.default.INTERNAL_SERVER_ERROR).json({
            message: finalError.message,
            errorInfo: (0, lodash_1.omit)(finalError, ['stack'])
        });
    }
    else {
        return res.status(httpStatus_1.default.INTERNAL_SERVER_ERROR).render('pages/error/error', {
            message: finalError.message,
            errorInfo: (0, lodash_1.omit)(finalError, ['stack'])
        });
    }
};
exports.defaultErrorHandler = defaultErrorHandler;
