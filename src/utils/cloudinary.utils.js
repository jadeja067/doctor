import {v2 as cloudinary} from 'cloudinary'
import fs from 'fs'
import dotenv from 'dotenv'

dotenv.config({path: './.env'})

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

const uploadToCLoudinary = async (localPath) => {
    try {
        if(!localPath) return null
        const response = await cloudinary.uploader.upload(localPath)
        // console.log("file is successfully uploaded to cloudinary", response.url, localPath);
        fs.unlinkSync(localPath)
        return response
    } catch (error) {
        console.log(`Error : ${error}`)
        fs.unlinkSync(localPath)
        return null
    }
}
export default uploadToCLoudinary