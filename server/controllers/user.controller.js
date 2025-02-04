const validator = require("validator");
const User = require("../models/userSchema.model");
const httpStatus = require("http-status");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const getDataUri = require("../utils/dataUri");
const Cloudinary = require("../utils/cloudinary");

exports.register = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, password, role } = req.body;

    if (!fullname || !email || !phoneNumber || !password || !role) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ message: "All fields are required", success: false });
    }

    if (!validator.isEmail(email)) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ message: "Invalid email format", success: false });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(httpStatus.CONFLICT).json({
        message: "User already exists with this email",
        success: false,
      });
    }

    let profilePhotoUrl = "";
    if (req.file) {
      const fileUri = getDataUri(req.file);
      const cloudResponse = await Cloudinary.uploader.upload(fileUri.content);
      profilePhotoUrl = cloudResponse?.secure_url;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      fullname,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
      profile: {
        profilePhoto: profilePhotoUrl,
      },
    });

    return res.status(httpStatus.CREATED).json({
      message: "User created successfully",
      success: true,
      user: newUser,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error", success: false });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.status(httpStatus.BAD_REQUEST).json({
        message: "Email, password and role are required",
        success: false,
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(httpStatus.UNAUTHORIZED)
        .json({ message: "Invalid email or password", success: false });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(httpStatus.UNAUTHORIZED)
        .json({ message: "Invalid email or password", success: false });
    }

    if (role !== user.role) {
      return res
        .status(httpStatus.FORBIDDEN)
        .json({ message: "Invalid role for this user", success: false });
    }

    const tokenData = {
      userId: user._id,
    };
    
    const token = jwt.sign(tokenData, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    const userResponse = {
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
        maxAge: 24 * 60 * 60 * 1000, // 1 day
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict"
      })
      .json({ message: `Welcome back ${user.fullname}`, success: true, user: userResponse });
  } catch (error) {
    console.error(error);
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error", success: false });
  }
};

exports.logout = (req, res) => {
  try {
    return res
      .status(httpStatus.OK)
      .clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict"
      })
      .json({ message: "Logged out successfully", success: true });
  } catch (error) {
    console.error(error);
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error", success: false });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, bio, skills } = req.body;
    const userId = req.id;

    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(httpStatus.NOT_FOUND)
        .json({ message: "User not found", success: false });
    }

    if (email && email !== user.email) {
      const emailExists = await User.findOne({ email });
      if (emailExists) {
        return res
          .status(httpStatus.CONFLICT)
          .json({ message: "Email already in use", success: false });
      }
    }

    user.fullname = fullname || user.fullname;
    user.email = email || user.email;
    user.phoneNumber = phoneNumber || user.phoneNumber;
    user.profile.bio = bio || user.profile.bio;
    user.profile.skills = skills ? skills.split(",").map(skill => skill.trim()) : user.profile.skills;

    if (req.file) {
      const fileUri = getDataUri(req.file);
      const cloudResponse = await Cloudinary.uploader.upload(fileUri.content, {
        resource_type: "auto"
      });
      if (cloudResponse) {
        user.profile.resume = cloudResponse.secure_url;
        user.profile.resumeOriginalName = req.file.originalname;
      }
    }

    await user.save();

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
    console.error("Error updating profile:", error);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: "An error occurred while updating the profile",
      success: false,
    });
  }
};
