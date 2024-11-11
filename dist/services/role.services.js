"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_service_1 = __importDefault(require("../services/database.service"));
const mongodb_1 = require("mongodb");
const role_model_1 = __importDefault(require("../models/schemas/role.model"));
class Roleservice {
    createRole(roleData) {
        return __awaiter(this, void 0, void 0, function* () {
            const newRole = new role_model_1.default(roleData);
            const result = yield database_service_1.default.Role.insertOne(newRole);
            return result;
        });
    }
    createRoleValidate(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield database_service_1.default.Role.findOne({ title: name, deleted: false });
            if (result) {
                return true;
            }
            return false;
        });
    }
    updateRole(id, roleData) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield database_service_1.default.Role.updateOne({ _id: new mongodb_1.ObjectId(id) }, { $set: roleData });
            return result;
        });
    }
    EditRoleValidate(title, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield database_service_1.default.Role.findOne({
                title: title,
                deleted: false,
                _id: { $ne: new mongodb_1.ObjectId(id) }
            });
            if (result) {
                return true;
            }
            return false;
        });
    }
    deleteRole(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield database_service_1.default.Role.updateOne({ _id: new mongodb_1.ObjectId(id) }, { $set: { deleted: true } });
            return result;
        });
    }
    patchPermissions(permissions) {
        return __awaiter(this, void 0, void 0, function* () {
            for (const item of permissions) {
                yield database_service_1.default.Role.updateOne({ _id: new mongodb_1.ObjectId(item.id) }, {
                    $set: {
                        permission: item.permissions
                    }
                });
            }
        });
    }
}
const roleService = new Roleservice();
exports.default = roleService;
