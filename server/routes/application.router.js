const express = require("express");
const {
  applyJob,
  getAppliedJobs,
  getApplications,
  updateStatus,
} = require("../controllers/application.controller");
const isAuthenticated = require("../middleware/isAuthenticated");
const router = express.Router();

router.route("/apply/:id").get(isAuthenticated, applyJob);
router.route("/applied-jobs").get(isAuthenticated, getAppliedJobs);
router.route("/:id/applier").get(isAuthenticated, getApplications);
router.route("/status/:id/update").put(isAuthenticated, updateStatus);
module.exports = router;
