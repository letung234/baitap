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
exports.deleteImage = exports.upload = void 0;
const medias_service_1 = __importDefault(require("~/services/medias.service"));
const httpStatus_1 = __importDefault(require("~/constants/httpStatus"));
const upload = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield medias_service_1.default.uploadImage(req);
    console.log(result);
    res.json({ location: result[0].url, public_id: result[0].public_id });
});
exports.upload = upload;
const deleteImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    console.log(id);
    const result = yield medias_service_1.default.deleteImage(id);
    return res.status(httpStatus_1.default.OK).json(result);
});
exports.deleteImage = deleteImage;
