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
  console.log("Query being sent:", query); // Log the query for debugging

  const result = await TodoModel.find(query);

  console.log("Fetched todos:", result);

  return result;
}

function geTodoByIdMongodb() {}

function updateTodoMongodb() {}

function deleteTodoMongodb() {}
