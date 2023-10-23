const express = require("express");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();


const app = express();
app.use(cors());
const port = 2000;

app.use(express.json());


const db = new sqlite3.Database("todos.db");

// Crear la tabla si no existe
db.run(
  "CREATE TABLE IF NOT EXISTS todos (id INTEGER PRIMARY KEY AUTOINCREMENT, text TEXT, status INTEGER DEFAULT 1,cantidad INTEGER DEFAULT 0)"
);

// Obtener todas las tareas
app.get("/todos", (req, res) => {
  db.all("SELECT * FROM todos", (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// Crear una nueva tarea
app.post("/todos", (req, res) => {
  const { text, cantidad } = req.body;
  if (!text || cantidad === undefined) {
    res.status(400).json({ error: "Los campos 'text' y 'cantidad' son requeridos." });
    return;
  }

  db.run("INSERT INTO todos (text, cantidad) VALUES (?, ?)", [text, cantidad], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ id: this.lastID });
  });
});

// Actualizar el estado de una tarea
app.put("/todos/:id", (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  db.run("UPDATE todos SET status = ? WHERE id = ?", [status, id], function (
    err
  ) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ rowsAffected: this.changes });
  });
});

// Actualizar el texto de una tarea
app.put("/todos/update/:id", (req, res) => {
  const { id } = req.params;
  const { text, cantidad } = req.body;

  if (!text || cantidad === undefined) {
    res.status(400).json({ error: "Los campos 'text' y 'cantidad' son requeridos." });
    return;
  }

  db.run("UPDATE todos SET text = ?, cantidad = ? WHERE id = ?", [text, cantidad, id], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ rowsAffected: this.changes });
  });
});
// Eliminar una tarea
app.delete("/todos/:id", (req, res) => {
  const { id } = req.params;

  db.run("DELETE FROM todos WHERE id = ?", [id], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ rowsAffected: this.changes });
  });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
