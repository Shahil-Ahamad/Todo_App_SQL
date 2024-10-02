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
import {
  createTodoMongodb,
  deleteTodoMongodb,
  getAllTodoMongodb,
  getTodoByIdMongodb,
  updateTodoMongodb,
} from "../mongoose/query";


export async function getTodoController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const todoId = req.params.todoId;

  if (!todoId) {
    return next("Please provide a valid todoId"); // Return next() to stop further processing
  }

  //MySQL
  // const result = await getTodoByIdWithPool(parseInt(todoId));

  // MongoDB
  const result = await getTodoByIdMongodb(parseInt(todoId));



  console.log("result", result);

  if (!result) {

    return res.status(404).json({
      message: "Todo not found",
    });
  } else {
    res.json({
      message: "Get todo by ID",
      data: result, 
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

    const result = await createTodoMongodb(task, description, status);

    console.log("result", result);

    res.status(201).json({
      message: "todo created successfully",
      todo: result,
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
    const { task, description, status } = req.body;

    //MySQL
    // const result = (await updateTodo(parseInt(todoId), task, status)) as {
    //   task: string;
    //   status: string;
    // }[];

    //MongoDB
    const result = await updateTodoMongodb(parseInt(todoId), task, description, status);

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

    //MySQL
    // const result = await deleteTodoWithPool(parseInt(todoId));

    //mongoDB
    const result = await deleteTodoMongodb(parseInt(todoId));

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
    // const result = await getAllTodosWithPool()

    const { task, description, status } = req.body;
    const result = await getAllTodoMongodb(task, description, status);

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
