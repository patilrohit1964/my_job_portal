const jwt = require("jsonwebtoken");
const httpStatus = require("http-status").status;
const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res
        .status(httpStatus.UNAUTHORIZED)
        .json({ message: "User not authenticated" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res
        .status(httpStatus.UNAUTHORIZED)
        .json({ message: "token not verified" });
    }

    req.id = decoded.userId;
    next();
  } catch (error) {
    console.error(error);
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: "Failed to authenticate user" });
  }
};

module.exports = isAuthenticated;
