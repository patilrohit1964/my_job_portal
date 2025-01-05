const httpsStatus = require("http-status").status;
const Application = require("../models/application.model");
const Job = require("../models/job.model");
exports.applyJob = async (req, res) => {
  try {
    const { id: jobId } = req.params;
    if (!jobId) {
      return res.status(httpsStatus.NOT_FOUND).json({
        message: "Job Id required",
      });
    }
    // check if user already applying
    const existingApplication = await Application.findOne({
      job: jobId,
      applier: req.id,
    });
    if (existingApplication) {
      return res.status(httpsStatus.CONFLICT).json({
        message: "You already have applied to this job",
      });
    }

    // check if not applying to job
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(httpsStatus.NOT_FOUND).json({
        message: "Job not found",
      });
    }

    const newApplication = await Application.create({
      job: jobId,
      applier: req.id,
    });

    job.applications.push(newApplication);
    await job.save();
    return res.status(httpsStatus.CREATED).json({
      message: "Job Applied Successfully",
    });
  } catch (error) {
    return res.status(httpsStatus.INTERNAL_SERVER_ERROR).json({
      message: "Internal Server Error",
    });
  }
};

exports.getAppliedJobs = async (req, res) => {
  try {
    const application = await Application.find({ applier: req.id })
      .sort({
        createdAt: -1,
      })
      .populate({
        path: "job",
        options: { sort: { createdAt: -1 } },
        populate: {
          path: "company",
          options: { sort: { createdAt: -1 } },
        },
      });
    if (!application) {
      return res.status(httpsStatus.NOT_FOUND).json({
        message: "No applied for the job",
      });
    }
    return res.status(httpsStatus.OK).json({
      message: "Applied Jobs",
      application,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(httpsStatus.INTERNAL_SERVER_ERROR).json({
      message: "Internal Server Error",
    });
  }
};

// admin check application how user applied for jobs
exports.getApplications = async (req, res) => {
  try {
    const { id: jobId } = req.params;
    const job = await Job.findById(jobId).populate({
      path: "applications",
      options: { sort: { createdAt: -1 } },
      populate: { path: "applier" },
    });
    if (!job) {
      return res.status(httpsStatus.NOT_FOUND).json({
        message: "Job not found",
      });
    }
    return res.status(httpsStatus.OK).json({
      message: "Applier Applications",
      job,
    });
  } catch (error) {
    return res.status(httpsStatus.INTERNAL_SERVER_ERROR).json({
      message: "Internal Server Error",
    });
  }
};

exports.updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const { id: applicationId } = req.params;
    if (!status) {
      return res.status(httpsStatus.NOT_FOUND).json({
        message: "Status required",
      });
    }
    // find the application by applicant id
    const application = await Application.findOne({ _id: applicationId });
    if (!application) {
      return res.status(httpsStatus.NOT_FOUND).json({
        message: "Application not found",
      });
    }
    //update the status
    application.status = status.toLowerCase();
    await application.save();
    return res.status(httpsStatus.OK).json({
      message: "Application status updated",
      application,
    });
  } catch (error) {
    return res.status(httpsStatus.INTERNAL_SERVER_ERROR).josn({
      message: "internal server error",
    });
  }
};
