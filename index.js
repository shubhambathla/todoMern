const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const { todo } = require("./db");
const { createTodo, updateTodo } = require("./types");

app.use(express.json());

app.post("/post", async (req, res) => {
  const todoBody = req.body;
  const createTodoCheck = createTodo.safeParse(todoBody);

  if (!createTodoCheck.success) {
    res.status(411).json({
      message: "You sent the wrong inputs",
    });
    return;
  }

  await todo.create({
    title: todoBody.title,
    description: todoBody.description,
    completed: false,
  });

  res.json({
    message: "New Todo Successfully Created",
  });
});

app.get("/posts", async (req, res) => {
  const todos = await todo.find({});
  res.json({
    todos,
  });
});

app.put("/completed", async (req, res) => {
  const updatePayload = req.body;
  const parsedPayload = updateTodo.safeParse(updatePayload);

  if (!parsedPayload.success) {
    req.json({
      message: "Something went wrong",
    });
  }

  await todo.updateOne(
    {
      _id: updatePayload.id,
    },
    {
      completed: true,
    }
  );

  res.json({
    message: "todo marked as completed",
  });
});

app.listen(3000);
