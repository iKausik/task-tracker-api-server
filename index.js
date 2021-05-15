const express = require("express");
const cors = require("cors");
require("dotenv").config();
// require("custom-env").env(true);

const database = require("./db");

const app = express();
const port = process.env.SITE_PORT || 4000;

// MIDDLEWARE
app.use(cors());
app.use(express.json());

// ROUTES
// add a task
app.post("/tasks", async (req, res) => {
  try {
    const { text, day, reminder } = req.body;
    const newTask = await database.query(
      "INSERT INTO tasks(text, day, reminder) VALUES($1, $2, $3) RETURNING *",
      [text, day, reminder]
    );
    res.json(newTask.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// all tasks
app.get("/tasks", async (req, res) => {
  try {
    const allTasks = await database.query("SELECT * FROM tasks");
    res.json(allTasks.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// task
app.get("/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const task = await database.query(`SELECT * FROM tasks WHERE id=${id}`);
    res.json(task.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// update
app.put("/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { text, day, reminder } = req.body;
    const updateTask = await database.query(
      "UPDATE tasks SET text=$1, day=$2, reminder=$3 WHERE id=$4 RETURNING *",
      [text, day, reminder, id]
    );
    res.json(updateTask.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// delete
app.delete("/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTask = await database.query("DELETE FROM tasks WHERE id=$1", [
      id,
    ]);
    res.json("The task was deleted");
  } catch (err) {
    console.error(err.message);
  }
});

app.listen(port, () => {
  console.log(`Server has started on port ${port}`);
});
