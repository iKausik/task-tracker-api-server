const { Pool } = require("pg");

// heroku config
const TASK_APP_USER = "fwkfmemgoihxhr";
const TASK_APP_PASSWORD =
  "36a9e9ddbfedfb89017076c5faab2b39c5fe6ee9f1f2d9a6cccd45e0693ffec3";
const TASK_APP_HOST = "ec2-54-152-185-191.compute-1.amazonaws.com";
const TASK_APP_PORT = 5432;
const TASK_APP_DATABASE = "dofb46f1patbh";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
  user: TASK_APP_USER || "postgres",
  password: TASK_APP_PASSWORD || "hello@sql",
  host: TASK_APP_HOST || "localhost",
  port: TASK_APP_PORT || 5432,
  database: TASK_APP_DATABASE || "task-tracker",
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
