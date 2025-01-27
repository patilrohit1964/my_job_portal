const validator = require("validator");
const User = require("../models/userSchema.model");
const httpStatus = require("http-status").status;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { default: status } = require("http-status");
const getDataUri = require("../utils/dataUri");
const { cloudinary_js_config } = require("../utils/cloudinary");
exports.register = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, password, role } = req.body;

    if (!fullname || !email || !phoneNumber || !password || !role) {
      return res
        .status(httpStatus.NOT_ACCEPTABLE)
        .json({ message: "All fields are required", success: false });
    }

    if (!validator.isEmail(email)) {
      return res
        .status(httpStatus.NOT_ACCEPTABLE)
        .json({ message: "Invalid email format", success: false });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(httpStatus[400]).json({
        message: "user is already exist with this email",
        success: false,
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      fullname,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
      profile: {
        profilePhoto: req?.file?.filename || "",
      },
    });
    return res
      .status(httpStatus.CREATED)
      .json({ message: "User created successfully", success: true });
  } catch (error) {
    console.log(error);
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: error?.message, success: false });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
      return res.status(httpStatus.NOT_ACCEPTABLE).json({
        message: "Something wrong all fields required",
        success: false,
      });
    }
    let user = await User.findOne({ email });

    if (!user) {
      return res
        .status(httpStatus.NOT_ACCEPTABLE)
        .json({ message: "email and password is incorrect", success: false });
    }

    const isPassword = await bcrypt.compare(password, user?.password);
    if (!isPassword) {
      return res
        .status(httpStatus.NOT_ACCEPTABLE)
        .json({ message: "password is incorrect", success: false });
    }
    // check user role
    if (role !== user?.role) {
      return res
        .status(httpStatus.NOT_ACCEPTABLE)
        .json({ message: "admin authenticated", success: false });
    }
    const tokenData = {
      userId: user?._id,
    };
    const token = jwt.sign(tokenData, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    user = {
      _id: user?._id,
      fullname: user?.fullname,
      email: user?.email,
      phoneNumber: user?.phoneNumber,
      role: user?.role,
      profile: user?.profile,
    };

    return res
      .status(httpStatus.OK)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "none",
        secure: true,
      })
      .json({ message: `Welcome back ${user?.fullname}`, success: true, user });
  } catch (error) {
    console.log(error);
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error", success: false });
  }
};

exports.logout = (req, res) => {
  try {
    res.clearCookie("token");
    return res
      .status(httpStatus.OK)
      .cookie("token", "", { maxAge: 0 })
      .json({ message: "Logged out successfully", success: true });
  } catch (error) {}
};

exports.updateProfile = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, bio, skills } = req.body;
    const userId = req?.id;
    // Fetch user
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(httpStatus.NOT_FOUND)
        .json({ message: "User not found", success: false });
    }

    // Update user fields
    user.fullname = fullname || user.fullname;
    user.email = email || user.email;
    user.phoneNumber = phoneNumber || user.phoneNumber;
    user.profile.bio = bio || user.profile.bio;
    user.profile.skills = skills ? skills.split(",") : user.profile.skills;
    user.profile.resume = req?.file?.filename || user.profile.resume;

    // Placeholder for Cloudinary resume upload logic
    if (req.file) {
      const fileUrl = getDataUri(req.file);
      const cloudResponce = await cloudinary.upl(req.file);
      user.profile.resume = resumeUrl;
    }

    // Save changes
    await user.save();

    // Prepare updated user object for response
    const updatedUser = {
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      profile: user.profile,
    };

    return res.status(httpStatus.OK).json({
      message: "Profile updated successfully",
      user: updatedUser,
      success: true,
    });
  } catch (error) {
    console.error("Error updating profile:", error.message);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: "An error occurred while updating the profile",
      success: false,
    });
  }
};
