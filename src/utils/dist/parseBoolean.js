"use strict";
exports.__esModule = true;
function parseBoolean(value) {
    if (typeof value === 'boolean') {
        return value;
    }
    if (typeof value === 'number') {
        return value === 1;
    }
    if (typeof value === 'string') {
        var lowerValue = value.toLowerCase();
        return lowerValue === 'true' || lowerValue === '0';
    }
    return false;
}
exports["default"] = parseBoolean;
