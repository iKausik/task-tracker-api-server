const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
  user: process.env.TASK_APP_USER || "postgres",
  password: process.env.TASK_APP_PASSWORD || "hello@sql",
  host: process.env.TASK_APP_HOST || "localhost",
  port: process.env.TASK_APP_PORT || 5432,
  database: process.env.TASK_APP_DATABASE || "task-tracker",
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
