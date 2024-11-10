"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_service_1 = __importDefault(require("../services/database.service"));
const mongodb_1 = require("mongodb");
const role_model_1 = __importDefault(require("../models/schemas/role.model"));
class Roleservice {
    async createRole(roleData) {
        const newRole = new role_model_1.default(roleData);
        const result = await database_service_1.default.Role.insertOne(newRole);
        return result;
    }
    async createRoleValidate(name) {
        const result = await database_service_1.default.Role.findOne({ title: name, deleted: false });
        if (result) {
            return true;
        }
        return false;
    }
    async updateRole(id, roleData) {
        const result = await database_service_1.default.Role.updateOne({ _id: new mongodb_1.ObjectId(id) }, { $set: roleData });
        return result;
    }
    async EditRoleValidate(title, id) {
        const result = await database_service_1.default.Role.findOne({
            title: title,
            deleted: false,
            _id: { $ne: new mongodb_1.ObjectId(id) }
        });
        if (result) {
            return true;
        }
        return false;
    }
    async deleteRole(id) {
        const result = await database_service_1.default.Role.updateOne({ _id: new mongodb_1.ObjectId(id) }, { $set: { deleted: true } });
        return result;
    }
    async patchPermissions(permissions) {
        for (const item of permissions) {
            await database_service_1.default.Role.updateOne({ _id: new mongodb_1.ObjectId(item.id) }, {
                $set: {
                    permission: item.permissions
                }
            });
        }
    }
}
const roleService = new Roleservice();
exports.default = roleService;
