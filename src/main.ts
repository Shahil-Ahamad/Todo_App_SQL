import express from "express";
import {
  createTodoController,
  getAllTodoController,
  getTodoController,
  updateTodoController,
  deleteTodoController,
} from "./controllers/todo-controller";

const PORT = 4000;

const app = express();

app.use(express.json());

app.get("/get-todo/:todoId", getTodoController);
app.post("/create-todo", createTodoController);
app.put("/update-todo/:todoId", updateTodoController);
app.delete("/delete-todo/:todoId", deleteTodoController);
app.get("/get-all-todos", getAllTodoController);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});