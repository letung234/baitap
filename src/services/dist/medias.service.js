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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var file_1 = require("~/utils/file");
var dir_1 = require("~/constants/dir");
var sharp_1 = require("sharp");
var path_1 = require("path");
var fs_1 = require("fs");
var enums_1 = require("~/constants/enums");
var promises_1 = require("fs/promises");
var cloudinary_1 = require("cloudinary");
var dotenv_1 = require("dotenv");
var config_1 = require("~/constants/config");
dotenv_1.config();
cloudinary_1["default"].v2.config({
    cloud_name: config_1.envConfig.cloudinary.cloudName,
    api_key: config_1.envConfig.cloudinary.apiKey,
    api_secret: config_1.envConfig.cloudinary.apiSecret
});
var MediasService = /** @class */ (function () {
    function MediasService() {
        var _this = this;
        this.deleteImage = function (publicId) { return __awaiter(_this, void 0, void 0, function () {
            var result, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, cloudinary_1["default"].v2.uploader.destroy(publicId, {
                                resource_type: 'image'
                            })];
                    case 1:
                        result = _a.sent();
                        if (result.result === 'ok') {
                            console.log('Image deleted successfully:', result);
                            return [2 /*return*/, { success: true }];
                        }
                        else {
                            console.error('Failed to delete image:', result);
                            return [2 /*return*/, { success: false, error: result }];
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        console.error('Error deleting image:', error_1);
                        return [2 /*return*/, { success: false, error: error_1.message }];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.uploadVideo = function (req) { return __awaiter(_this, void 0, void 0, function () {
            var files, result;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, file_1.handleUploadVideo(req)
                        // Xử lý từng video và upload lên Cloudinary
                    ];
                    case 1:
                        files = _a.sent();
                        return [4 /*yield*/, Promise.all(files.map(function (file) { return __awaiter(_this, void 0, void 0, function () {
                                var uploadResult;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, cloudinary_1["default"].v2.uploader.upload(file.filepath, {
                                                resource_type: 'video',
                                                public_id: file.newFilename,
                                                folder: 'videos',
                                                overwrite: true // Có thể ghi đè video nếu đã tồn tại
                                            })
                                            // Xóa file tạm sau khi upload
                                        ];
                                        case 1:
                                            uploadResult = _a.sent();
                                            // Xóa file tạm sau khi upload
                                            return [4 /*yield*/, promises_1["default"].unlink(file.filepath)];
                                        case 2:
                                            // Xóa file tạm sau khi upload
                                            _a.sent();
                                            return [2 /*return*/, {
                                                    url: uploadResult.secure_url,
                                                    type: enums_1.MediaType.Video
                                                }];
                                    }
                                });
                            }); }))];
                    case 2:
                        result = _a.sent();
                        return [2 /*return*/, result];
                }
            });
        }); };
    }
    MediasService.prototype.uploadImage = function (req) {
        return __awaiter(this, void 0, void 0, function () {
            var files, result;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, file_1.handleUploadImage(req)];
                    case 1:
                        files = _a.sent();
                        console.log(files);
                        return [4 /*yield*/, Promise.all(files.map(function (file) { return __awaiter(_this, void 0, void 0, function () {
                                var newName, newFullFilename, newPath, cloudinaryResult;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            newName = file_1.getNameFromFullname(file.newFilename) + 'lethanhtung';
                                            newFullFilename = newName + ".jpg";
                                            newPath = path_1["default"].resolve(dir_1.UPLOAD_IMAGE_TEMP_DIR, newFullFilename);
                                            console.log(file.filepath);
                                            console.log(newPath);
                                            return [4 /*yield*/, sharp_1["default"](file.filepath).jpeg().toFile(newPath)
                                                // Upload lên Cloudinary
                                            ];
                                        case 1:
                                            _a.sent();
                                            return [4 /*yield*/, cloudinary_1["default"].v2.uploader.upload(file.filepath, {
                                                    public_id: newName,
                                                    resource_type: 'image',
                                                    folder: 'images' // Tạo một thư mục 'images' trên Cloudinary
                                                })];
                                        case 2:
                                            cloudinaryResult = _a.sent();
                                            console.log(cloudinaryResult);
                                            // Xóa các tệp tạm
                                            return [4 /*yield*/, Promise.all([fs_1["default"].promises.unlink(file.filepath), fs_1["default"].promises.unlink(newPath)])];
                                        case 3:
                                            // Xóa các tệp tạm
                                            _a.sent();
                                            return [2 /*return*/, {
                                                    url: cloudinaryResult.secure_url,
                                                    public_id: cloudinaryResult.public_id,
                                                    type: enums_1.MediaType.Image
                                                }];
                                    }
                                });
                            }); }))];
                    case 2:
                        result = _a.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    return MediasService;
}());
var mediasService = new MediasService();
exports["default"] = mediasService;
