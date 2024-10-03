import { TodoModel } from "./schema";

export async function createTodoMongodb(
  task: string,
  description: string,
  status: string
) {
  const result = await TodoModel.create({
    task,
    description,
    status,
  });
  console.log("Created todo", result);
  return result;
}

export async function getAllTodoMongodb() {
  const result = await TodoModel.find();
  console.log("Fetched todos:", result);
  return result;
}
export async function getTodoByIdMongodb(todoId: string) {
  const result = await TodoModel.findById(todoId);
  return result;
}
export async function updateTodoMongodb(
  todoId: any,
  task: string,
  description: string,
  status: string
) {
  const result = await TodoModel.findByIdAndUpdate(todoId, {
    $set: {
      task,
      description,
      status,
    },
  });
  console.log("Updated todo:", result);
  return result;
}

export async function deleteTodoMongodb(todoId: string) {
  const result = await TodoModel.findByIdAndDelete(todoId);
  console.log("Deleted todo:", result);
  return result;
}
