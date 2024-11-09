"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchUtils = void 0;
const searchUtils = (keywords) => {
    const objectSearch = {};
    if (keywords) {
        Object.keys(keywords).forEach((key) => {
            const value = keywords[key];
            if (value) {
                objectSearch[key] = new RegExp(value, 'i');
            }
        });
    }
    return objectSearch;
};
exports.searchUtils = searchUtils;
