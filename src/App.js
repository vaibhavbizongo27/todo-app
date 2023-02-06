import React from "react";
import "./App.css";
import { useState } from "react";

const App = () => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [edit, setEditId] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    // do not refresh

     if(edit)
     {
      const editTodo=todos.find((i)=>i.id===edit);
      const updatedTodos=todos.map((t)=>
        t.id===editTodo.id?
        (t={id:t.id,todo}):
        {id:t.id,todo:t.todo}
      );

      setTodos(updatedTodos);
       setTodo("");
       setEditId(0);
        return ;
     }

    if (todo !== "") {
      setTodos([{ id: `${todo}-${Date.now()}`, todo }, ...todos]);
    }
    // id is for to create a unique id
    setTodo("");
  };

  const handleDelete = (id) => {
    const deletetodo = todos.filter((to) => to.id !== id);
    setTodos([...deletetodo]);
  };

  const handleEdit = (id) => {
    const edittodo = todos.find((i) => i.id === id);
    setTodo(edittodo.todo);
    setEditId(id);
  };

  return (
    <div className="App">
      <div className="container">
        <h1>Todo List App</h1>
        <form className="todoForm" onSubmit={handleSubmit}>
          <input
            placeholder="Enter your task"
            type="text"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
          />
          <button type="submit">{edit ? "Edit" : "Go"}</button>
        </form>

        <ul className="allTodos">
          {todos.map((t) => (
            <li className="singleTodo">
              <span className="todoText" key={t.id}>
                {t.todo}
              </span>
              <button onClick={() => handleEdit(t.id)}>Edit</button>
              <button onClick={() => handleDelete(t.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
