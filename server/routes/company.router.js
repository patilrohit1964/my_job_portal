const express = require("express");
const {
  registerCompany,
  getCompany,
  updateCompany,
  getCompanyById,
} = require("../controllers/company.controller");
const isAuthenticated = require("../middleware/isAuthenticated");

const router = express.Router();

router.route("/create-company").post(isAuthenticated, registerCompany);
router.route("/get-company").get(isAuthenticated, getCompany);
router.route("/get-company/:id").get(isAuthenticated, getCompanyById);
router.route("/update-company/:id").put(isAuthenticated, updateCompany);
module.exports = router;
