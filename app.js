const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const authRoutes = require("./routes/authRoutes");

const app = express();

dotenv.config();

const PORT = process.env.PORT || 3000;

//set-up middleware
app.use(express.static(path.join(__dirname, "/")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//default Route
app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  const indexPath = path.join(__dirname, "index.html");
  res.sendFile(indexPath, (err) => {
    if (err) {
      if (err && err.code === "ENOENT") {
        // File not found
        return res.status(404).json({
          success: 0,
          message: "File not found",
        });
      } else {
        // Other error
        res.status(500).json({ success: 0, message: "Internal Server Error" });
      }
    }
  });
});

app.get("/login", (req, res) => {
  const loginPath = path.join(__dirname, "login.html");

  res.sendFile(loginPath, (err) => {
    if (err) {
      if (err && err.code === "ENOENT") {
        // File not found
        return res.status(404).json({
          success: 0,
          message: "File not found",
        });
      } else {
        // Other error
        return res
          .status(500)
          .json({ success: 0, message: "Internal Server Error" });
      }
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is runnig on http://localhost:${PORT}`);
});
