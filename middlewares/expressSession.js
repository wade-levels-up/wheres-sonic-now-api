require("dotenv").config();
const session = require("express-session");
const pg = require("pg");
const pgSession = require("connect-pg-simple")(session);
const jwt = require("jsonwebtoken");

function createExpressSession({ regenerate = false } = {}) {
  const pgPool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
  });

  const sessionMiddleware = session({
    secret: process.env.KEY,
    resave: false,
    saveUninitialized: false,
    store: new pgSession({
      pool: pgPool,
      tableName: "Session",
      pruneSessionInterval: 60,
    }),
  });

  return (req, res, next) => {
    // Check for a JWT in the Authorization header
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (token && !regenerate) {
      try {
        console.log("Token found in header:", token);
        return next();
      } catch (err) {
        console.log("Invalid or expired JWT:", err.message);
        // Proceed to session creation if the JWT is invalid
      }
    }

    // If no valid JWT exists, proceed with session creation/regeneration
    sessionMiddleware(req, res, (err) => {
      if (err) return next(err);

      req.generateJwt = (sessionId) => {
        const payload = { sessionId };
        const secret = process.env.JWT_SECRET;
        const options = { expiresIn: "30m" };

        return jwt.sign(payload, secret, options);
      };

      if (regenerate) {
        // Regenerate the session if needed
        req.session.regenerate((err) => {
          if (err) {
            console.log("Error regenerating session", err);
            return next(err);
          }
          req.jwt = req.generateJwt(req.sessionID);
          console.log("Session regenerated from:", req.sessionID);
          console.log("New session token made:", req.jwt);
          next();
        });
      } else {
        // Simply use the existing session
        console.log("Using existing session:", req.sessionID);
        req.jwt = req.generateJwt(req.sessionID);
        next();
      }
    });
  };
}

module.exports = createExpressSession;
