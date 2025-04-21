require("dotenv").config();
const session = require("express-session");
const pg = require("pg");
const pgSession = require("connect-pg-simple")(session);

function expressSession() {
  const pgPool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
  });

  return session({
    secret: "key",
    resave: false,
    saveUninitialized: true,
    store: new pgSession({ pool: pgPool, tableName: "Session" }),
    cookie: { maxAge: 24 * 60 * 60 * 1000 }, // 1 Day,
  });
}

module.exports = expressSession;
