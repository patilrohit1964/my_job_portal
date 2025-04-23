const cookieParser = require("cookie-parser");
const express = require("express");
const cors = require("cors");
const connectDb = require("./utils/db");
const userRouter = require("./routes/user.router");
const compnayRouter = require("./routes/company.router");
const path = require("path");
const jobRouter = require("./routes/job.router");
const applicationRouter = require("./routes/application.router");
require("dotenv").config({});
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./uploads"));
app.use(cookieParser());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "http://localhost:5175",
      "http://localhost:5176",
    ],
    credentials: true,
  })
);
const PORT = process.env.PORT || 5050;

app.use("/api/v1/user", userRouter);
app.use("/api/v1/company", compnayRouter);
app.use("/api/v1/job", jobRouter);
app.use("/api/v1/application", applicationRouter);
app.use(express.static(path.join(__dirname, "../client/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});
app.listen(PORT, () => {
  connectDb();
  console.log("server running on: ", PORT);
});
