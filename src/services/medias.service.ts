import { Request } from 'express'
import { getNameFromFullname, handleUploadImage, handleUploadVideo } from '~/utils/file'
import { UPLOAD_IMAGE_TEMP_DIR, UPLOAD_VIDEO_DIR, UPLOAD_VIDEO_TEMP_DIR } from '~/constants/dir'
import sharp from 'sharp'
import path from 'path'
import fs from 'fs'
import { MediaType } from '~/constants/enums'
import fsPromise from 'fs/promises'
import cloudinary from 'cloudinary'
import { config } from 'dotenv'
import { Media } from '~/models/Others'
import { envConfig } from '~/constants/config'
config()
cloudinary.v2.config({
  cloud_name: envConfig.cloudinary.cloudName,
  api_key: envConfig.cloudinary.apiKey,
  api_secret: envConfig.cloudinary.apiSecret
})

class MediasService {
  async uploadImage(req: Request) {
    const files = await handleUploadImage(req)
    console.log(files)
    const result: Media[] = await Promise.all(
      files.map(async (file) => {
        const newName = getNameFromFullname(file.newFilename) + 'lethanhtung'
        const newFullFilename = `${newName}.jpg`
        const newPath = path.resolve(UPLOAD_IMAGE_TEMP_DIR, newFullFilename)
        console.log(file.filepath)
        console.log(newPath)
        await sharp(file.filepath).jpeg().toFile(newPath)

        // Upload lên Cloudinary
        const cloudinaryResult = await cloudinary.v2.uploader.upload(file.filepath, {
          public_id: newName, // Nếu bạn muốn chỉ định tên tệp cụ thể
          resource_type: 'image',
          folder: 'images' // Tạo một thư mục 'images' trên Cloudinary
        })
        console.log(cloudinaryResult)

        // Xóa các tệp tạm
        await Promise.all([fs.promises.unlink(file.filepath), fs.promises.unlink(newPath)])

        return {
          url: cloudinaryResult.secure_url,
          public_id: cloudinaryResult.public_id,
          type: MediaType.Image
        }
      })
    )
    return result
  }
  deleteImage = async (publicId: string) => {
    try {
      const result = await cloudinary.v2.uploader.destroy(publicId, {
        resource_type: 'image'
      })

      if (result.result === 'ok') {
        console.log('Image deleted successfully:', result)
        return { success: true }
      } else {
        console.error('Failed to delete image:', result)
        return { success: false, error: result }
      }
    } catch (error: any) {
      console.error('Error deleting image:', error)
      return { success: false, error: error.message }
    }
  }
  uploadVideo = async (req: Request) => {
    // Xử lý upload video và lấy danh sách video
    const files = await handleUploadVideo(req)

    // Xử lý từng video và upload lên Cloudinary
    const result: Media[] = await Promise.all(
      files.map(async (file) => {
        // Upload video lên Cloudinary
        const uploadResult = await cloudinary.v2.uploader.upload(file.filepath, {
          resource_type: 'video', // Đặt loại tài nguyên là video
          public_id: file.newFilename, // Tùy chọn ID công khai cho video
          folder: 'videos', // Tùy chọn thư mục lưu trữ trong Cloudinary
          overwrite: true // Có thể ghi đè video nếu đã tồn tại
        })

        // Xóa file tạm sau khi upload
        await fsPromise.unlink(file.filepath)

        return {
          url: uploadResult.secure_url, // Lấy URL video từ Cloudinary
          type: MediaType.Video
        }
      })
    )

    return result
  }
}
const mediasService = new MediasService()

export default mediasService
