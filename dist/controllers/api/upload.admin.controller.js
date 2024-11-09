"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteImage = exports.upload = void 0;
const medias_service_1 = __importDefault(require("../../services/medias.service"));
const httpStatus_1 = __importDefault(require("../../constants/httpStatus"));
const upload = async (req, res) => {
    const result = await medias_service_1.default.uploadImage(req);
    console.log(result);
    res.json({ location: result[0].url, public_id: result[0].public_id });
};
exports.upload = upload;
const deleteImage = async (req, res) => {
    const id = req.params.id;
    console.log(id);
    const result = await medias_service_1.default.deleteImage(id);
    return res.status(httpStatus_1.default.OK).json(result);
};
exports.deleteImage = deleteImage;
