const pool = require("../config/db");

// Check if a user exists by email
exports.findUserByEmail = async (email) => {
  const [rows] = await pool.execute("SELECT * FROM users WHERE email=?", [
    email,
  ]);

  return rows.length > 0 ? rows[0] : null;
};

exports.createUsers = async (name, email, hashedPassword) => {
  await pool.execute("INSERT INTO users (name,email,password) VALUES (?,?,?)", [
    name,
    email,
    hashedPassword,
  ]);
};
