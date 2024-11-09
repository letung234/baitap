"use strict";
exports.__esModule = true;
var Role = /** @class */ (function () {
    function Role(role) {
        this._id = role._id;
        this.title = role.title;
        this.description = role.description;
        this.permission = role.permission || [];
        this.deleted = role.deleted || false;
        this.deletedAt = role.deletedAt;
        this.createdAt = role.createdAt || new Date();
        this.updatedAt = role.updatedAt || new Date();
    }
    return Role;
}());
exports["default"] = Role;
