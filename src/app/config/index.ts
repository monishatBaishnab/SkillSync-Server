import env from "dotenv";
import path from "path";

env.config({ path: path.join(process.cwd(), ".env") });

export const local_config = {
  port: process.env.PORT,
  jwt_secret: process.env.JWT_SECRET,
  cloudinary_cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  cloudinary_api_key: process.env.CLOUDINARY_API_KEY,
  cloudinary_api_secret: process.env.CLOUDINARY_API_SECRET,
};
