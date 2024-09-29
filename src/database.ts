import mysql from "mysql2/promise";

// create connection
async function getMysqlConnection() {
  const conn = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "todo_db",
    password: "0486577@Mm",
    port: 3306
  });
  return conn;
}

export async function getAllTodos() {
  const conn = await getMysqlConnection();

  const result = await conn.query("SELEC * FROM todos");

  console.log("getAllTodos Result:", result[0]);

  return result[0];
}

async function createTodosTable() {
  const conn = await getMysqlConnection();

  await conn.query(
    `
    CREATE TABLE IF NOT EXISTS todos (
      id INT PRIMARY KEY AUTO_INCREMENT,
      name VARCHAR(255),
      created_at DATETIME DEFAULT(NOW())
    );
    `
  );
}

export async function createTodo(name: string, status: string) {
  const conn = await getMysqlConnection();

  const [result]: any = await conn.query(
    `INSERT INTO todos (Name, Status) VALUES (?, ?)`,
    [name, status]
  );

  const insertedId = result.insertId;

  const [newTodo]: any = await conn.query(
    `SELECT * FROM todos WHERE Id = ?`,
    [insertedId]
  );

  return newTodo[0];
}


export async function updateTodo(
  todoId: number,
  name: string,
  status: string
) {
  const conn = await getMysqlConnection();

  const [result]: any = await conn.query(
    `UPDATE todos SET Name = ?, Status = ? WHERE Id = ?`,
    [name, status, todoId]
  );

  if (result.affectedRows === 0) {
    return null;
  }

  const [updatedTodo]: any = await conn.query(
    `SELECT * FROM todos WHERE Id = ?`,
    [todoId]
  );

  return updatedTodo[0];
}

export async function deleteTodo(todoId: number) {
  const conn = await getMysqlConnection();

  const [result]: any = await conn.query(
    `DELETE FROM todos WHERE Id = ?`,
    [todoId]
  );

  return result.affectedRows > 0;
}