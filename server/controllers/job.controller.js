const httpsStatus = require("http-status").status;
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
        .status(httpsStatus.BAD_REQUEST)
        .json({ message: "All fields are required", status: false });
    }

    const job = await Job.create({
      title,
      description,
      requirements: requirements.split(","),
      salary: Number(salary),
      location,
      jobType,
      experienceLevel: experience,
      position,
      company: companyId,
      created_by: req.id,
    });

    res
      .status(httpsStatus.CREATED)
      .json({ message: "Job posted successfully", job, status: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", status: false });
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
        .status(httpsStatus.NOT_FOUND)
        .json({ message: "No jobs found", status: false });
    }
    return res.status(httpsStatus.OK).json({
      jobs,
      message: "Jobs fetched successfully",
      status: true,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(httpsStatus.INTERNAL_SERVER_ERROR)
      .json({ message: "Server error", status: false });
  }
};

exports.getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate({
      path: "applications",
    });
    if (!job) {
      return res
        .status(httpsStatus.NOT_FOUND)
        .json({ message: "Job not found", status: false });
    }
    return res.status(httpsStatus.OK).json({
      message: "Job fetched successfully",
      job,
      status: true,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(httpsStatus.INTERNAL_SERVER_ERROR)
      .json({ message: "Server error", status: false });
  }
};

// admin controller
exports.getAdminJobs = async (req, res) => {
  try {
    const adminId = req.id;
    const jobs = await Job.find({ created_by: adminId }).populate("company");
    if (!jobs) {
      return res
        .status(httpsStatus.NOT_FOUND)
        .json({ message: "No jobs found", status: false });
    }
    return res.status(httpsStatus.OK).json({
      message: "Jobs fetched successfully",
      jobs,
      status: true,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(httpsStatus.INTERNAL_SERVER_ERROR)
      .json({ message: "Server error", status: false });
  }
};
