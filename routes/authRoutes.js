const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/authControllers");

//user regestration
router.post("/register", registerUser);

//user login
router.post("/loginUser", loginUser);

module.exports = router;
