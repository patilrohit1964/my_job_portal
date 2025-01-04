const express = require("express");
const {
  postJob,
  getAllJobs,
  getAdminJobs,
} = require("../controllers/job.controller");
const isAuthencticated = require("../middleware/isAuthenticated");

const router = express.Router();

router.route("/create-job").post(isAuthencticated, postJob);
router.route("/all/jobs").post(isAuthencticated, getAllJobs);
router.route("/get/:id").post(isAuthencticated, postJob);
router.route("/getAdmin/jobs").post(isAuthencticated, getAdminJobs);

module.exports = router;
