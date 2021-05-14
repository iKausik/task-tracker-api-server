const { Pool } = require("pg");
require("custom-env").env(true);

console.log(process.env.TASK_APP_HOST);

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
  user: process.env.TASK_APP_USER,
  password: process.env.TASK_APP_PASSWORD,
  host: process.env.TASK_APP_HOST,
  port: process.env.TASK_APP_PORT,
  database: process.env.TASK_APP_DATABASE,
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
