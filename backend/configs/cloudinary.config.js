import { v2 as cloudinary } from 'cloudinary'
import multer from 'multer'
import { CloudinaryStorage } from 'multer-storage-cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

const profileStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'images/users/profile_picture',
    fomat: async (req, file) => 'png jpeg webp ',
    public_id: (req, file) => 'computed-filename-using-request',
  },
})

export const uploadProfilePicture = multer({ storage: profileStorage })
