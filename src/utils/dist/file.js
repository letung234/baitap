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
exports.getFiles = exports.getExtension = exports.getNameFromFullname = exports.handleUploadVideo = exports.handleUploadImage = exports.initFolder = void 0;
var fs_1 = require("fs");
var path_1 = require("path");
var dir_1 = require("~/constants/dir");
var uuid_1 = require("uuid");
exports.initFolder = function () {
    ;
    [dir_1.UPLOAD_IMAGE_TEMP_DIR, dir_1.UPLOAD_VIDEO_TEMP_DIR].forEach(function (dir) {
        if (!fs_1["default"].existsSync(dir)) {
            fs_1["default"].mkdirSync(dir, {
                recursive: true // mục đích là để tạo folder nested
            });
        }
    });
};
exports.handleUploadImage = function (req) { return __awaiter(void 0, void 0, void 0, function () {
    var formidable, form;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log(1);
                return [4 /*yield*/, Promise.resolve().then(function () { return require('formidable'); })];
            case 1:
                formidable = (_a.sent())["default"];
                form = formidable({
                    uploadDir: dir_1.UPLOAD_IMAGE_TEMP_DIR,
                    maxFiles: 4,
                    keepExtensions: true,
                    maxFileSize: 3000 * 1024,
                    maxTotalFileSize: 300 * 1024 * 4,
                    filter: function (_a) {
                        var name = _a.name, originalFilename = _a.originalFilename, mimetype = _a.mimetype;
                        var valid = name === 'image' && Boolean(mimetype === null || mimetype === void 0 ? void 0 : mimetype.includes('image/'));
                        if (!valid) {
                            form.emit('error', new Error('File type is not valid'));
                        }
                        return valid;
                    }
                });
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        form.parse(req, function (err, fields, files) {
                            if (err) {
                                return reject(err);
                            }
                            // eslint-disable-next-line no-extra-boolean-cast
                            if (!Boolean(files.image)) {
                                return reject(new Error('File is empty'));
                            }
                            resolve(files.image);
                        });
                    })];
        }
    });
}); };
// Cách xử lý khi upload video và encode
// Có 2 giai đoạn
// Upload video: Upload video thành công thì resolve về cho người dùng
// Encode video: Khai báo thêm 1 url endpoint để check xem cái video đó đã encode xong chưa
exports.handleUploadVideo = function (req) { return __awaiter(void 0, void 0, void 0, function () {
    var formidable, idName, folderPath, form;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Promise.resolve().then(function () { return require('formidable'); })];
            case 1:
                formidable = (_a.sent())["default"];
                idName = uuid_1.v4();
                folderPath = path_1["default"].resolve(dir_1.UPLOAD_VIDEO_DIR, idName);
                fs_1["default"].mkdirSync(folderPath);
                form = formidable({
                    uploadDir: folderPath,
                    maxFiles: 1,
                    maxFileSize: 50 * 1024 * 1024,
                    filter: function (_a) {
                        var name = _a.name, originalFilename = _a.originalFilename, mimetype = _a.mimetype;
                        var valid = name === 'video' && Boolean((mimetype === null || mimetype === void 0 ? void 0 : mimetype.includes('mp4')) || (mimetype === null || mimetype === void 0 ? void 0 : mimetype.includes('quicktime')));
                        if (!valid) {
                            form.emit('error', new Error('File type is not valid'));
                        }
                        return valid;
                    },
                    filename: function () {
                        return idName;
                    }
                });
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        form.parse(req, function (err, fields, files) {
                            if (err) {
                                return reject(err);
                            }
                            // eslint-disable-next-line no-extra-boolean-cast
                            if (!Boolean(files.video)) {
                                return reject(new Error('File is empty'));
                            }
                            var videos = files.video;
                            videos.forEach(function (video) {
                                var ext = exports.getExtension(video.originalFilename);
                                fs_1["default"].renameSync(video.filepath, video.filepath + '.' + ext);
                                video.newFilename = video.newFilename + '.' + ext;
                                video.filepath = video.filepath + '.' + ext;
                                // console.log(video.filepath)
                            });
                            resolve(files.video);
                        });
                    })];
        }
    });
}); };
exports.getNameFromFullname = function (fullname) {
    var namearr = fullname.split('.');
    namearr.pop();
    return namearr.join('');
};
exports.getExtension = function (fullname) {
    var namearr = fullname.split('.');
    return namearr[namearr.length - 1];
};
exports.getFiles = function (dir, files) {
    if (files === void 0) { files = []; }
    // Get an array of all files and directories in the passed directory using fs.readdirSync
    var fileList = fs_1["default"].readdirSync(dir);
    // Create the full path of the file/directory by concatenating the passed directory and file/directory name
    for (var _i = 0, fileList_1 = fileList; _i < fileList_1.length; _i++) {
        var file = fileList_1[_i];
        var name = dir + "/" + file;
        // Check if the current file/directory is a directory using fs.statSync
        if (fs_1["default"].statSync(name).isDirectory()) {
            // If it is a directory, recursively call the getFiles function with the directory path and the files array
            exports.getFiles(name, files);
        }
        else {
            // If it is a file, push the full path to the files array
            files.push(name);
        }
    }
    return files;
};
