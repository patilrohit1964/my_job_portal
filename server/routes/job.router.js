const express = require("express");
const {
  postJob,
  getAllJobs,
  getAdminJobs,
  getJobById,
} = require("../controllers/job.controller");
const isAuthencticated = require("../middleware/isAuthenticated");

const router = express.Router();

router.route("/create-job").post(isAuthencticated, postJob);
router.route("/all/jobs").get(isAuthencticated, getAllJobs);
router.route("/get/:id").get(isAuthencticated, getJobById);
router.route("/getAdmin/jobs").get(isAuthencticated, getAdminJobs);

module.exports = router;
