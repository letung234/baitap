"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const handler_1 = require("../../utils/handler");
const upload_admin_controller_1 = require("../../controllers/api/upload.admin.controller");
const UploadRoutes = (0, express_1.Router)();
UploadRoutes.post('/images', (0, handler_1.wrapRequestHandler)(upload_admin_controller_1.upload));
UploadRoutes.delete('/delete-images/:id', (0, handler_1.wrapRequestHandler)(upload_admin_controller_1.deleteImage));
exports.default = UploadRoutes;
