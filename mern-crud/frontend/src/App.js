import { useEffect, useState } from "react";

const API = "http://localhost:5000/api/todos";

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");

  // Fetch todos
  const fetchTodos = async () => {
    const res = await fetch(API);
    setTodos(await res.json());
  };

  useEffect(() => { fetchTodos(); }, []);

  // Add todo
  const addTodo = async (e) => {
    e.preventDefault();
    await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title })
    });
    setTitle("");
    fetchTodos();
  };

  // Toggle complete
  const toggleComplete = async (id, completed) => {
    await fetch(`${API}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: !completed })
    });
    fetchTodos();
  };

  // Delete todo
  const deleteTodo = async (id) => {
    await fetch(`${API}/${id}`, { method: "DELETE" });
    fetchTodos();
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Todo App</h1>
      <form onSubmit={addTodo}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter todo"
        />
        <button type="submit">Add</button>
      </form>
      <ul>
        {todos.map((t) => (
          <li key={t._id}>
            <input
              type="checkbox"
              checked={t.completed}
              onChange={() => toggleComplete(t._id, t.completed)}
            />
            {t.title}
            <button onClick={() => deleteTodo(t._id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
