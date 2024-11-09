"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = parseBoolean;
function parseBoolean(value) {
    if (typeof value === 'boolean') {
        return value;
    }
    if (typeof value === 'number') {
        return value === 1;
    }
    if (typeof value === 'string') {
        const lowerValue = value.toLowerCase();
        return lowerValue === 'true' || lowerValue === '0';
    }
    return false;
}
