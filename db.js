const { Pool } = require("pg");
require("custom-env").env(true);

console.log(process.env.HOST);

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: process.env.REJECT_UNAUTH,
  },
  user: process.env.USER,
  password: process.env.PASSWORD,
  host: process.env.HOST,
  port: process.env.PORT,
  database: process.env.DATABASE,
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
