const pool = require("../config/db");
const { findUserByEmail, createUsers } = require("../model/authModel");
const bcrypt = require("bcryptjs");

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if user exists using the model
    const existingUser = await findUserByEmail(email);

    if (existingUser) {
      return res
        .status(400)
        .json({ success: 0, message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user using the model
    await createUsers(name, email, hashedPassword);

    // Respond with success
    res
      .status(201)
      .json({ success: 1, message: "User registered successfully!" });
  } catch (error) {
    res.status(500).json({ success: 0, message: "An error occurred!", error });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    //check user
    const user = await findUserByEmail(email);
    if (!user || null) {
      return res
        .status(400)
        .json({ success: 0, message: "User not found! Please register." });
    }

    // Compare the password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res
        .status(400)
        .json({ success: 0, message: "Invalid credentials!" });
    }

    // Respond with success and user data
    return res.status(200).json({
      message: "Login successful!",
      user: {
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ success: 0, message: "An error occurred!", error });
  }
};

module.exports = { registerUser, loginUser };
