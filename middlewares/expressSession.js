require("dotenv").config();
const session = require("express-session");
const pg = require("pg");
const pgSession = require("connect-pg-simple")(session);

function createExpressSession({ regenerate = false } = {}) {
  const pgPool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
  });

  const sessionMiddleware = session({
    secret: "key",
    resave: false,
    saveUninitialized: false,
    store: new pgSession({
      pool: pgPool,
      tableName: "Session",
      pruneSessionInterval: 60,
    }),
    cookie: { maxAge: 60 * 60 * 1000 }, // 1 Hour
  });

  return (req, res, next) => {
    sessionMiddleware(req, res, (err) => {
      if (err) return next(err);

      if (regenerate) {
        // Regenerate the session if needed
        req.session.regenerate((err) => {
          if (err) {
            console.log("Error regenerating session", err);
            return next(err);
          }
          console.log("New Session ID:", req.sessionID);
          next();
        });
      } else {
        // Simply use the existing session
        next();
      }
    });
  };
}

module.exports = createExpressSession;
