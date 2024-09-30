import mysql from "mysql2/promise";

// create connection
async function getMysqlConnection() {
  const conn = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "todo_db",
    password: "0486577@Mm",
    port: 3306,
  });
  return conn;
}

export async function getAllTodos() {
  const conn = await getMysqlConnection();

  const result = await conn.query("SELECT * FROM todos");

  console.log("getAllTodos Result:", result[0]);

  return result[0];
}

async function createTodosTable() {
  const conn = await getMysqlConnection();

  await conn.query(
    `
    CREATE TABLE IF NOT EXISTS todos (
      id INT PRIMARY KEY AUTO_INCREMENT,
      task VARCHAR(255),
      status VARCHAR(255),
      created_at DATETIME DEFAULT(NOW())
    );
    `
  );
}

export async function createTodo(task: string,status:string) {
  const conn = await getMysqlConnection();

  const result = await conn.query(
    `INSERT INTO todos (task,status) VALUES ('${task}','${status}');`
  );

  return result[0];
}

export async function getTodoById(todoId: number) {
  const conn = await getMysqlConnection();

  const result = await conn.query(`SELECT * FROM todos WHERE id=${todoId}`);

  return result[0];
}

export async function updateTodo(todoId: number, task: string,status:string) {
  const conn = await getMysqlConnection();

  const result = await conn.query(
    `UPDATE todos SET task ='${task}' status = '${status}' WHERE id=${todoId}`
  );

  return result[0];
}

export async function deleteTodo(todoId: number) {
  const conn = await getMysqlConnection();

  const result = await conn.query(`DELETE FROM todos WHERE id = ${todoId}`);

  return result[0];
}
