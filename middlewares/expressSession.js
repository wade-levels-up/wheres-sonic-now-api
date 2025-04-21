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
    store: new pgSession({ pool: pgPool, tableName: "session" }),
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 }, // 30 Days,
  });
}

module.exports = expressSession;
