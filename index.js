const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const { createTodo, updateTodo } = require("./types");

app.use(express.json());

app.post("/post", (req, res) => {
  const todoBody = req.body;
  const createTodoCheck = createTodo.safeParse(todoBody);

  if (!createTodoCheck.success) {
    res.status(411).json({
      message: "You sent the wrong inputs",
    });
    return;
  }
});

app.get("/posts", (req, res) => {});

app.put("/completed", (req, res) => {
  const updatePayload = req.body;
  const parsedPayload = updateTodo.safeParse(updatePayload);

  if (!parsedPayload.success) {
    req.json({
      message: "Something went wrong",
    });
  }
});
