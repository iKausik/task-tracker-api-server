const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "hello@sql",
  host: "localhost",
  port: 5432,
  database: "task-tracker",
});

module.exports = pool;
