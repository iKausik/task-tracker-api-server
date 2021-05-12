const Pool = require("pg").Pool;

const pool = new Pool({
  user: process.env.HEROKU_PSQL_USER || "postgres",
  password: process.env.HEROKU_PSQL_PASSWORD || "hello@sql",
  host: process.env.HEROKU_PSQL_HOST || "localhost",
  port: process.env.HEROKU_PSQL_PORT || 5432,
  database: process.env.HEROKU_PSQL_DATABASE || "task-tracker",
});

module.exports = pool;
