const { Pool } = require("pg");
const dotenv = require("dotenv");

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
  user: process.env.HEROKU_PSQL_USER || "postgres",
  password: process.env.HEROKU_PSQL_PASSWORD || "hello@sql",
  host: process.env.HEROKU_PSQL_HOST || "localhost",
  port: process.env.HEROKU_PSQL_PORT || 5432,
  database: process.env.HEROKU_PSQL_DATABASE || "task-tracker",
});

const execute = async () => {
  try {
    await pool.query(
      "CREATE TABLE tasks(id SERIAL PRIMARY KEY, text VARCHAR(255) NOT NULL, day VARCHAR(255) NOT NULL, reminder VARCHAR(255) NOT NULL)"
    );
  } catch (err) {
    console.error(err.message);
  }
};
execute();

module.exports = pool;
