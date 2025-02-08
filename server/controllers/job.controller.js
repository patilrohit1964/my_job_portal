const httpStatus = require("http-status").status;
const Job = require("../models/job.model");
exports.postJob = async (req, res) => {
  try {
    const {
      title,
      description,
      requirements,
      salary,
      location,
      jobType,
      experience,
      position,
      companyId,
    } = req.body;

    if (
      !title ||
      !description ||
      !requirements ||
      !salary ||
      !location ||
      !jobType ||
      !experience ||
      !position
    ) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ message: "All fields are required", success: false });
    }

    const job = await Job.create({
      title,
      description,
      requirements: requirements.split(","),
      salary: Number(salary),
      location,
      jobType,
      experienceLevel: Number(experience),
      position,
      company: companyId,
      created_by: req.id,
    });

    res
      .status(httpStatus.CREATED)
      .json({ message: "Job posted successfully", job, success: true });
  } catch (error) {
    console.error(error);
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: "Server error", success: false });
  }
};

exports.getAllJobs = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";
    const query = {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    };
    const jobs = await Job.find(query)
      .populate({
        path: "company",
      })
      .sort({ createdAt: -1 });

    if (!jobs) {
      return res
        .status(httpStatus.NOT_FOUND)
        .json({ message: "No jobs found", success: false });
    }
    return res.status(httpStatus.OK).json({
      jobs,
      message: "Jobs fetched successfully",
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: "Server error", success: false });
  }
};

exports.getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate({
      path: "applications",
    });
    if (!job) {
      return res
        .status(httpStatus.NOT_FOUND)
        .json({ message: "Job not found", success: false });
    }
    return res.status(httpStatus.OK).json({
      message: "Job fetched successfully",
      job,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: "Server error", success: false });
  }
};

// admin controller
exports.getAdminJobs = async (req, res) => {
  try {
    const adminId = req.id;
    const jobs = await Job.find({ created_by: adminId })
      .populate("company")
      .sort({ createdAt: -1 });
    if (!jobs || jobs.length === 0) {
      return res
        .status(httpStatus.NOT_FOUND)
        .json({ message: "No jobs found", success: false });
    }

    return res.status(httpStatus.OK).json({
      message: "Jobs fetched successfully",
      jobs,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: "Server error", success: false });
  }
};
