"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RefreshToken {
    constructor({ _id, token, created_at, user_id, iat, exp }) {
        this._id = _id;
        this.token = token;
        this.created_at = created_at || new Date();
        this.user_id = user_id;
        this.iat = new Date(iat * 1000);
        this.exp = exp ? new Date(exp * 1000) : new Date(this.iat.getTime() + 5 * 24 * 60 * 60 * 1000);
    }
}
exports.default = RefreshToken;
