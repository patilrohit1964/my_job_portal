const cookieParser = require("cookie-parser");
const express = require("express");
const cors = require("cors");
const connectDb = require("./utils/db");
const userRouter = require("./routes/user.router");
const compnayRouter = require("./routes/company.router");
require("dotenv").config({});
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
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

app.listen(PORT, () => {
  connectDb();
  console.log("server running on: ", PORT);
});
