const cors = require("cors");
const express = require("express");
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");
const staticRoute = require("./routes/staticRoute");
const studentRoute = require("./routes/studentRoute");
const teacherRoute = require("./routes/teacherRoute");
const adminRoute = require("./routes/admin");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

(async () => {
  await connectDB();

  app.use(
    cors({
      origin: process.env.FRONTEND_URL,
      credentials: true,
      methods: ["GET", "POST", "PUT", "DELETE"],
      allowedHeaders: ["Content-Type", "Authorization"],
    })
  );

  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());
  app.use(cookieParser());

  app.get("/health", (req, res) => res.status(200).json({ status: "ok" }));

  app.use("/api", staticRoute);
  app.use("/api/admin", adminRoute);
  app.use("/api/student", studentRoute);
  app.use("/api/teacher", teacherRoute);

  app.listen(PORT, () => console.log(`Server Started on PORT:${PORT}`));
})();
