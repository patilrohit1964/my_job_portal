const express = require("express");
const {
  register,
  login,
  updateProfile,
  logout,
} = require("../controllers/user.controller");
const isAuthenticated = require("../middleware/isAuthenticated");

const router = express.Router();

router.route("/register").post(upload,register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/profile/update").put(isAuthenticated, updateProfile);

module.exports = router;
