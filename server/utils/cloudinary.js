const cloudinary = require("cloudinary").v2;
require("dotenv").config({ path: "./.env" });

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
console.log(process.env.CLOUD_NAME,process.env.CLOUDINARY_API)
module.exports = cloudinary;
