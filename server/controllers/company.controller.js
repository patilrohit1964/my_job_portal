const Company = require("../models/company.model");
const httpStatus = require("http-status").status;

exports.registerCompany = async (req, res) => {
  try {
    const { companyName } = req.body;
    if (!companyName) {
      return res.status(400).json({
        message: "Company name is required",
        status: false,
      });
    }
    let company = await Company.findOne({ name: companyName });
    if (company) {
      return res
        .status(httpStatus.CONFLICT)
        .json({ message: "Company already exists", success: false });
    }
    company = await Company.create({
      name: companyName,
      userId: req.id,
    });

    res.status(httpStatus.CREATED).json({
      message: "Company registered successfully",
      company,
      success: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", success: false });
  }
};

exports.getCompany = async (req, res) => {
  try {
    const company = await Company.find({ userId: req.id });
    if (!company) {
      return res
        .status(httpStatus.ALREADY_REPORTED)
        .json({ message: "Company not found" });
    }
    res.json(company);
  } catch (error) {
    console.error(error);
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: "Server error" });
  }
};

exports.getCompanyById = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);
    if (!company) {
      return res
        .status(httpStatus.ALREADY_REPORTED)
        .json({ message: "Company not found" });
    }
    return res.status(httpStatus.OK).json({ company });
  } catch (error) {
    console.error(error);
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: "Server error" });
  }
};

exports.updateCompany = async (req, res) => {
  try {
    const { name, description, website, location } = req.body;
    const file = req.file;

    // cloudinary
    const updateData = { name, description, website, location };

    const company = await Company.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    if (!company) {
      return res
        .status(httpStatus.ALREADY_REPORTED)
        .json({ message: "Company name is required" });
    }

    res
      .status(httpStatus.OK)
      .json({ company, message: "Company has been updated" });
  } catch (error) {
    console.error(error);
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: "Server error" });
  }
};
