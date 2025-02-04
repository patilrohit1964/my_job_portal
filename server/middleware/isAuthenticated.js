const jwt = require("jsonwebtoken");
const httpStatus = require("http-status");

const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res
        .status(httpStatus.UNAUTHORIZED)
        .json({ message: "User not authenticated", success: false });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return res
        .status(httpStatus.UNAUTHORIZED)
        .json({ message: "Invalid or expired token", success: false });
    }

    req.id = decoded.userId;
    next();
  } catch (error) {
    console.error(error);
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: "Failed to authenticate user", success: false });
  }
};

module.exports = isAuthenticated;
