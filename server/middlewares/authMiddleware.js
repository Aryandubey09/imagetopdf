const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  // 1️⃣ Get token from Authorization header
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Not authorized, token missing" });
  }

  const token = authHeader.split(" ")[1];

  // 2️⃣ Verify token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // 3️⃣ Attach user info to request
    req.user = decoded; 
    next(); // continue to next middleware / route
  } catch (err) {
    return res.status(401).json({ message: "Token failed or expired" });
  }
};

module.exports = protect;
