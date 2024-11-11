"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.getFiles = exports.getExtension = exports.getNameFromFullname = exports.handleUploadVideo = exports.handleUploadImage = exports.initFolder = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const dir_1 = require("../constants/dir");
const uuid_1 = require("uuid");
const initFolder = () => {
    ;
    [dir_1.UPLOAD_IMAGE_TEMP_DIR, dir_1.UPLOAD_VIDEO_TEMP_DIR].forEach((dir) => {
        if (!fs_1.default.existsSync(dir)) {
            fs_1.default.mkdirSync(dir, {
                recursive: true
            });
        }
    });
};
exports.initFolder = initFolder;
const handleUploadImage = (req) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(1);
    const formidable = (yield Promise.resolve().then(() => __importStar(require('formidable')))).default;
    const form = formidable({
        uploadDir: dir_1.UPLOAD_IMAGE_TEMP_DIR,
        maxFiles: 4,
        keepExtensions: true,
        maxFileSize: 3000 * 1024,
        maxTotalFileSize: 300 * 1024 * 4,
        filter: function ({ name, originalFilename, mimetype }) {
            const valid = name === 'image' && Boolean(mimetype === null || mimetype === void 0 ? void 0 : mimetype.includes('image/'));
            if (!valid) {
                form.emit('error', new Error('File type is not valid'));
            }
            return valid;
        }
    });
    return new Promise((resolve, reject) => {
        form.parse(req, (err, fields, files) => {
            if (err) {
                return reject(err);
            }
            if (!Boolean(files.image)) {
                return reject(new Error('File is empty'));
            }
            resolve(files.image);
        });
    });
});
exports.handleUploadImage = handleUploadImage;
const handleUploadVideo = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const formidable = (yield Promise.resolve().then(() => __importStar(require('formidable')))).default;
    const idName = (0, uuid_1.v4)();
    const folderPath = path_1.default.resolve(dir_1.UPLOAD_VIDEO_DIR, idName);
    fs_1.default.mkdirSync(folderPath);
    const form = formidable({
        uploadDir: folderPath,
        maxFiles: 1,
        maxFileSize: 50 * 1024 * 1024,
        filter: function ({ name, originalFilename, mimetype }) {
            const valid = name === 'video' && Boolean((mimetype === null || mimetype === void 0 ? void 0 : mimetype.includes('mp4')) || (mimetype === null || mimetype === void 0 ? void 0 : mimetype.includes('quicktime')));
            if (!valid) {
                form.emit('error', new Error('File type is not valid'));
            }
            return valid;
        },
        filename: function () {
            return idName;
        }
    });
    return new Promise((resolve, reject) => {
        form.parse(req, (err, fields, files) => {
            if (err) {
                return reject(err);
            }
            if (!Boolean(files.video)) {
                return reject(new Error('File is empty'));
            }
            const videos = files.video;
            videos.forEach((video) => {
                const ext = (0, exports.getExtension)(video.originalFilename);
                fs_1.default.renameSync(video.filepath, video.filepath + '.' + ext);
                video.newFilename = video.newFilename + '.' + ext;
                video.filepath = video.filepath + '.' + ext;
            });
            resolve(files.video);
        });
    });
});
exports.handleUploadVideo = handleUploadVideo;
const getNameFromFullname = (fullname) => {
    const namearr = fullname.split('.');
    namearr.pop();
    return namearr.join('');
};
exports.getNameFromFullname = getNameFromFullname;
const getExtension = (fullname) => {
    const namearr = fullname.split('.');
    return namearr[namearr.length - 1];
};
exports.getExtension = getExtension;
const getFiles = (dir, files = []) => {
    const fileList = fs_1.default.readdirSync(dir);
    for (const file of fileList) {
        const name = `${dir}/${file}`;
        if (fs_1.default.statSync(name).isDirectory()) {
            (0, exports.getFiles)(name, files);
        }
        else {
            files.push(name);
        }
    }
    return files;
};
exports.getFiles = getFiles;
