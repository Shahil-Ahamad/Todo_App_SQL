import { NextFunction, Request, Response } from "express";
import { TodoModel } from "../models/todo-model";
import { createTodo, deleteTodo, getAllTodos, updateTodo } from "../database";


export function getTodoController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const todoId = req.params.todoId;

  if (!todoId) {
    next("Please provide valid todoId");
    return;
  }

  const myTodoModel = new TodoModel();

  const todo = myTodoModel.getTodo(parseInt(todoId as string));

  if (!todo) {
    res.status(404).json({
      messagge: "todo not found",
    });
    return;
  }

  res.json({
    data: todo,
  });
}

export async function createTodoController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { name, status } = req.body;
    if (!name || !status) {
      return res.status(400).json({ message: "Invalid input data" });
    }

    const createdTodo = await createTodo(name, status);
    res.status(201).json({
      data: createdTodo,
      message: "Todo created successfully!",
    });
  } catch (error) {
    next(error);
  }
}

export async function updateTodoController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { todoId } = req.params;
    const { name, status } = req.body;

    if (!todoId || !name || !status) {
      return res.status(400).json({ message: "Invalid input data" });
    }

    const updatedTodo = await updateTodo(parseInt(todoId), name, status);
    if (!updatedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.json({
      data: updatedTodo,
      message: "Todo updated successfully!",
    });
  } catch (error) {
    next(error);
  }
}

export async function deleteTodoController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { todoId } = req.params;
    if (!todoId) {
      return res.status(400).json({ message: "Please provide a valid todoId" });
    }

    const result = await deleteTodo(parseInt(todoId));
    if (!result) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.json({
      message: "Todo deleted successfully!",
    });
  } catch (error) {
    next(error);
  }
}

export async function getAllTodoController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const result = await getAllTodos();

  res.json({
    data: result
  })
  
}