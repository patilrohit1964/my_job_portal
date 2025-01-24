const express = require("express");
const {
  register,
  login,
  updateProfile,
  logout,
} = require("../controllers/user.controller");
const isAuthenticated = require("../middleware/isAuthenticated");
const upload = require("../middleware/multer");

const router = express.Router();

router.route("/register").post(upload.single("file"), register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/profile/update").put(isAuthenticated, updateProfile);

module.exports = router;
