const multer = require("multer");

const singleUpload = multer.memoryStorage();
const upload = multer({ storage: singleUpload });
module.exports = upload;
