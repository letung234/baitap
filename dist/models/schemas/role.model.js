"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Role {
    constructor(role) {
        this._id = role._id;
        this.title = role.title;
        this.description = role.description;
        this.permission = role.permission || [];
        this.deleted = role.deleted || false;
        this.deletedAt = role.deletedAt;
        this.createdAt = role.createdAt || new Date();
        this.updatedAt = role.updatedAt || new Date();
    }
}
exports.default = Role;
