const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, username: user.username }, // Payload
    process.env.ACCESS_TOKEN_SECRET, // Secret key
    { expiresIn: "1h" }
  );
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET); // Returns the decoded payload
  } catch (err) {
    throw new Error("Invalid or expired token");
  }
};

module.exports = { generateToken, verifyToken };
