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
const file_1 = require("../utils/file");
const dir_1 = require("../constants/dir");
const sharp_1 = __importDefault(require("sharp"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const enums_1 = require("../constants/enums");
const promises_1 = __importDefault(require("fs/promises"));
const cloudinary_1 = __importDefault(require("cloudinary"));
const dotenv_1 = require("dotenv");
const config_1 = require("../constants/config");
(0, dotenv_1.config)();
cloudinary_1.default.v2.config({
    cloud_name: config_1.envConfig.cloudinary.cloudName,
    api_key: config_1.envConfig.cloudinary.apiKey,
    api_secret: config_1.envConfig.cloudinary.apiSecret
});
class MediasService {
    constructor() {
        this.deleteImage = (publicId) => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield cloudinary_1.default.v2.uploader.destroy(publicId, {
                    resource_type: 'image'
                });
                if (result.result === 'ok') {
                    console.log('Image deleted successfully:', result);
                    return { success: true };
                }
                else {
                    console.error('Failed to delete image:', result);
                    return { success: false, error: result };
                }
            }
            catch (error) {
                console.error('Error deleting image:', error);
                return { success: false, error: error.message };
            }
        });
        this.uploadVideo = (req) => __awaiter(this, void 0, void 0, function* () {
            // Xử lý upload video và lấy danh sách video
            const files = yield (0, file_1.handleUploadVideo)(req);
            // Xử lý từng video và upload lên Cloudinary
            const result = yield Promise.all(files.map((file) => __awaiter(this, void 0, void 0, function* () {
                // Upload video lên Cloudinary
                const uploadResult = yield cloudinary_1.default.v2.uploader.upload(file.filepath, {
                    resource_type: 'video', // Đặt loại tài nguyên là video
                    public_id: file.newFilename, // Tùy chọn ID công khai cho video
                    folder: 'videos', // Tùy chọn thư mục lưu trữ trong Cloudinary
                    overwrite: true // Có thể ghi đè video nếu đã tồn tại
                });
                // Xóa file tạm sau khi upload
                yield promises_1.default.unlink(file.filepath);
                return {
                    url: uploadResult.secure_url, // Lấy URL video từ Cloudinary
                    type: enums_1.MediaType.Video
                };
            })));
            return result;
        });
    }
    uploadImage(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const files = yield (0, file_1.handleUploadImage)(req);
            console.log(files);
            const result = yield Promise.all(files.map((file) => __awaiter(this, void 0, void 0, function* () {
                const newName = (0, file_1.getNameFromFullname)(file.newFilename) + 'lethanhtung';
                const newFullFilename = `${newName}.jpg`;
                const newPath = path_1.default.resolve(dir_1.UPLOAD_IMAGE_TEMP_DIR, newFullFilename);
                console.log(file.filepath);
                console.log(newPath);
                yield (0, sharp_1.default)(file.filepath).jpeg().toFile(newPath);
                // Upload lên Cloudinary
                const cloudinaryResult = yield cloudinary_1.default.v2.uploader.upload(file.filepath, {
                    public_id: newName, // Nếu bạn muốn chỉ định tên tệp cụ thể
                    resource_type: 'image',
                    folder: 'images' // Tạo một thư mục 'images' trên Cloudinary
                });
                console.log(cloudinaryResult);
                // Xóa các tệp tạm
                yield Promise.all([fs_1.default.promises.unlink(file.filepath), fs_1.default.promises.unlink(newPath)]);
                return {
                    url: cloudinaryResult.secure_url,
                    public_id: cloudinaryResult.public_id,
                    type: enums_1.MediaType.Image
                };
            })));
            return result;
        });
    }
}
const mediasService = new MediasService();
exports.default = mediasService;
