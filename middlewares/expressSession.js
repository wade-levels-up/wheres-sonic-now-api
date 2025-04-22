require("dotenv").config();
const session = require("express-session");
const pg = require("pg");
const pgSession = require("connect-pg-simple")(session);
const asyncHandler = require("express-async-handler");

function expressSession() {
  const pgPool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
  });

  const sessionMiddleware = session({
    secret: "key",
    resave: false,
    saveUninitialized: true,
    store: new pgSession({ pool: pgPool, tableName: "Session" }),
    cookie: { maxAge: 24 * 60 * 60 * 1000 }, // 1 Day,
  });

  return (req, res, next) => {
    sessionMiddleware(req, res, (err) => {
      if (err) return next(err);

      req.session.regenerate((err) => {
        if (err) {
          console.log("Error regenerating session", err);
          return next(err);
        }
        next();
      });
    });
  };
}

module.exports = expressSession;
