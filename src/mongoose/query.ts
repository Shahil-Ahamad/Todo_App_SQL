import { TodoModel } from "./schema";

export async function createTodoMongodb(task: string, description: string) {
  const result = await TodoModel.create({
    task,
    description,
  });


  console.log('Created todo',result);

  return result;

}
