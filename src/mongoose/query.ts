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

export async function getAllTodoMongodb(
  task: string,
  description: string,
  status: string
) {
  const query = { task, description, status };

  const result = await TodoModel.find(query);
  console.log("Fetched todos:", result);
  return result;
}
export async function getTodoByIdMongodb(todoId: number) {
  const result = await TodoModel.findById(todoId);
  return result;
}

export async function updateTodoMongodb(
  todoId: number,
  task: string,
  description: string,
  status: string
) {
  const result = await TodoModel.updateOne(
    { id: todoId },
    {
      $set: {
        task,
        description,
        status,
      },
    }
  );
  console.log("Updated todo:", result);
  return result;
}

export async function deleteTodoMongodb(todoId: number) {
  const result = await TodoModel.deleteOne({ id: todoId });
  console.log("Deleted todo:", result);
  return result;
}
