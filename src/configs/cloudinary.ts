import { v2 as cloudinary } from 'cloudinary'
import { CloudinaryStorage } from 'multer-storage-cloudinary'
import multer from 'multer'
import dotenv from 'dotenv'
dotenv.config()
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
})

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => ({
    folder: 'menu-qr-code',
    allowedFormats: ['jpg', 'png'],
    public_id: file.originalname
  })
})

const uploadCloud = multer({ storage })

export default uploadCloud
