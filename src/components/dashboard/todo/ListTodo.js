import React, { useEffect, useState } from 'react';
import axios from 'axios';

import EditTodo from './EditTodo';

const ListTodos = ({ allTodos, setTodosChange }) => {
  const [todos, setTodos] = useState([]);

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/dashboard/todos/${id}`);

      setTodos(todos.filter((todo) => todo.todo_id !== id));
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    setTodos(allTodos);
  }, [allTodos]);
  return (
    <>
      {' '}
      <table className="table mt-5 text-center">
        <thead>
          <tr>
            <th>Description</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {todos.length !== 0 &&
            todos[0].todo_id !== null &&
            todos.map((todo) => (
              <tr key={todo.todo_id}>
                <td>{todo.description}</td>
                <td>
                  <EditTodo todo={todo} setTodosChange={setTodosChange} />
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteTodo(todo.todo_id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
};

export default ListTodos;
