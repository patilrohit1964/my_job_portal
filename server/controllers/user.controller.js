const validator = require("validator");
const User = require("../models/userSchema.model");
const httpStatus = require("http-status").status;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
exports.register = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, password, role } = req.body;
    if (!fullname || !email || !phoneNumber || !password || !role) {
      return res
        .status(httpStatus.NOT_ACCEPTABLE)
        .json({ message: "All fields are required" });
    }

    if (!validator.isEmail(email)) {
      return res
        .status(httpStatus.NOT_ACCEPTABLE)
        .json({ message: "Invalid email format" });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(httpStatus[400])
        .json({ message: "user is already exist with this email" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      fullname,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
    });
    return res
      .status(httpStatus.CREATED)
      .json({ message: "User created successfully", success: true });
  } catch (error) {
    console.log(error);
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
      return res
        .status(httpStatus.NOT_ACCEPTABLE)
        .json({ message: "Something wrong all fields required" });
    }
    let user = await User.findOne({ email });

    if (!user) {
      return res
        .status(httpStatus.NOT_ACCEPTABLE)
        .json({ message: "email and password is incorrect" });
    }

    const isPassword = await bcrypt.compare(password, user.password);
    if (!isPassword) {
      return res
        .status(httpStatus.NOT_ACCEPTABLE)
        .json({ message: "password is incorrect" });
    }
    // check user role
    if (role !== user.role) {
      return res
        .status(httpStatus.NOT_ACCEPTABLE)
        .json({ message: "admin authenticated" });
    }
    const tokenData = {
      userId: user._id,
    };
    const token = jwt.sign(tokenData, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    return res
      .status(httpStatus.OK)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "none",
        secure: true,
      })
      .json({ message: `Welcome back ${user.fullname}`, success: true, user });
  } catch (error) {
    console.log(error);
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error" });
  }
};

exports.logout = (req, res) => {
  try {
    res.clearCookie("token");
    return res
      .status(httpStatus.OK)
      .cookie("token", "", { maxAge: 0 })
      .json({ message: "Logged out successfully" });
  } catch (error) {}
};

exports.updateProfile = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, bio, skills } = req.body;
    const file = req.file;

    // cloudinary

    let skillsArray;
    if (skills) {
      skillsArray = skills.split(",");
    }
    const userId = req.id;
    let user = await User.findById(userId);
    if (!user) {
      return res
        .status(httpStatus.NOT_FOUND)
        .json({ message: "User not found" });
    }

    if (fullname) user.fullname = fullname;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (bio) user.profile.bio = bio;
    if (skills) user.profile.skills = skillsArray;

    // resume upload from here
    await user.save();

    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    return res
      .status(httpStatus.OK)
      .json({ message: "Profile updated successfully", user });
  } catch (error) {
    console.log(error.message);
  }
};
