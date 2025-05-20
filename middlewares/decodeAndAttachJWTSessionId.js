const jwt = require("jsonwebtoken");

function decodeAndAttachJWTSessionId(req, res, next) {
  // Verify and decode the JWT to get the session ID
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(401).json({ message: "Authorization header missing" });
  }

  const token = authHeader.split(" ")[1]; //
  if (!token) {
    return res.status(401).json({ message: "Token missing" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the JWT
    req.sessionID = decoded.sessionId; // Attach the session ID to the request object
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
}

module.exports = decodeAndAttachJWTSessionId;
