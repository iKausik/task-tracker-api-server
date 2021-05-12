const { Pool, Client } = require("pg");

const pool = new Pool({
  user: process.env.HEROKU_PSQL_USER || "postgres",
  password: process.env.HEROKU_PSQL_PASSWORD || "hello@sql",
  host: process.env.HEROKU_PSQL_HOST || "localhost",
  port: process.env.HEROKU_PSQL_PORT || 5432,
  database: process.env.HEROKU_PSQL_DATABASE || "task-tracker",
});

const client = new Client({
  user: process.env.HEROKU_PSQL_USER || "postgres",
  password: process.env.HEROKU_PSQL_PASSWORD || "hello@sql",
  host: process.env.HEROKU_PSQL_HOST || "localhost",
  port: process.env.HEROKU_PSQL_PORT || 5432,
  database: process.env.HEROKU_PSQL_DATABASE || "task-tracker",
});
client.connect();

client.query(
  "CREATE TABLE tasks(id SERIAL PRIMARY KEY, text VARCHAR(255) NOT NULL, day VARCHAR(255) NOT NULL, reminder VARCHAR(255) NOT NULL)",
  (err, res) => {
    console.log(err, res);
    client.end();
  }
);

module.exports = pool;
