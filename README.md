```sql
CREATE DATABASE todo_db;

use todo_db;

CREATE TABLE IF NOT EXISTS todos(
 Id INT PRIMARY KEY AUTO_INCREMENT,
 Title VARCHAR(255),
Name VARCHAR(255),
Status VARCHAR(255),
Created_At DATETIME DEFAULT(NOW())
);

INSERT INTO todos(Title,Name,Status) VALUES 
('CODE','mAKING TODO','DONE'),
('CODING','MAKING todo','IN_PROGRESS');

SELECT * FROM todos;

```
