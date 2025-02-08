const httpStatus = require("http-status").status;

const Application = require("../models/application.model");
const Job = require("../models/job.model");
exports.applyJob = async (req, res) => {
  try {
    const { id: jobId } = req.params;
    if (!jobId) {
      return res.status(httpStatus.NOT_FOUND).json({
        message: "Job Id required",
        success: false,
      });
    }
    // check if user already applying
    const existingApplication = await Application.findOne({
      job: jobId,
      applier: req.id,
    });
    if (existingApplication) {
      return res.status(httpStatus.CONFLICT).json({
        message: "You already have applied to this job",
        success: true,
      });
    }

    // check if not applying to job
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(httpStatus.NOT_FOUND).json({
        message: "Job not found",
        success: false,
      });
    }

    const newApplication = await Application.create({
      job: jobId,
      applier: req.id,
    });

    job.applications.push(newApplication);
    await job.save();
    return res.status(httpStatus.CREATED).json({
      message: "Job Applied Successfully",
      success: true,
    });
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: "Internal Server Error",
      success: false,
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
      return res.status(httpStatus.NOT_FOUND).json({
        message: "No applied for the job",
        success: false,
      });
    }
    return res.status(httpStatus.OK).json({
      message: "Applied Jobs",
      application,
      success: true,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: "Internal Server Error",
      success: false,
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
      return res.status(httpStatus.NOT_FOUND).json({
        message: "Job not found",
        success: false,
      });
    }
    return res.status(httpStatus.OK).json({
      message: "Applier Applications",
      job,
      success: true,
    });
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

exports.updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const { id: applicationId } = req.params;
    if (!status) {
      return res.status(httpStatus.NOT_FOUND).json({
        message: "Status required",
        success: false,
      });
    }
    // find the application by applicant id
    const application = await Application.findOne({ _id: applicationId });
    if (!application) {
      return res.status(httpStatus.NOT_FOUND).json({
        message: "Application not found",
        success: false,
      });
    }
    //update the status
    application.status = status.toLowerCase();
    await application.save();
    return res.status(httpStatus.OK).json({
      message: "Application status updated",
      application,
      success: true,
    });
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: "Internal server error",
      success: false,
    });
  }
};
