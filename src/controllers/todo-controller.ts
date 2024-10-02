import { NextFunction, Request, Response } from "express";
import { TodoModel } from "../models/todo-model";
import {
  createTodo,
  createTodoWithPool,
  deleteTodo,
  deleteTodoWithPool,
  getAllTodos,
  getAllTodosWithPool,
  getTodoById,
  getTodoByIdWithPool,
  updateTodo,
  updateTodoWithPool,
} from "../database";
import { createTodoMongodb } from "../mongoose/query";

export async function getTodoController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const todoId = req.params.todoId;

  if (!todoId) {
    next("Please provide valid todoId");
    return;
  }

  const result = (await getTodoByIdWithPool(parseInt(todoId))) as {
    id: number;
    task: string;
    status: string;
    created_at: Date;
  }[];

  console.log("result", result);

  if (!result.length) {
    res.status(404).json({
      message: "todo not found",
    });
  } else {
    res.json({
      message: "get todo by id",
      data: result[0],
    });
  }
}

export async function createTodoController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const body = req.body;

    console.log("body", body);

    const task = body.task;
    const status = body.status;

    const description = body.description;

    // const result = await createTodoWithPool(task, status);

    const result = await createTodoMongodb(task,description);

    console.log("result", result);

    res.status(201).json({
      message: "todo created successfully",
      todo:result,
    });
  } catch (error: any) {
    console.error(error);
    next(error.message);
  }
}

export async function updateTodoController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const todoId = req.params.todoId;
    const { task, status } = req.body;

    const result = (await updateTodo(parseInt(todoId), task, status)) as {
      task: string;
      status: string;
    }[];

    console.log("Updated Data", result);

    res.status(201).json({
      data: result,
      message: "Todo updated successfully!",
    });
  } catch (error: any) {
    console.error(error);
    next(error.message);
  }
  //
}
export async function deleteTodoController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const todoId = req.params.todoId;

    const result = await deleteTodoWithPool(parseInt(todoId));

    res.status(201).json({
      message: "Todo Deleted Successfully!",
    });
  } catch (error: any) {
    console.error(error);
    next(error.message);
  }
}

export async function getAllTodoController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const result = await getAllTodosWithPool();

    console.log("Result", result);

    res.json({
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
    });
  }
}
