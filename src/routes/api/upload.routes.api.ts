import { Router } from 'express'
import { wrapRequestHandler } from '~/utils/handler'
import { deleteImage, upload } from '~/controllers/api/upload.admin.controller'
const UploadRoutes = Router()
UploadRoutes.post('/images', wrapRequestHandler(upload))
UploadRoutes.delete('/delete-images/:id', wrapRequestHandler(deleteImage))
export default UploadRoutes
