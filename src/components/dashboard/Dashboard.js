import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import NewTodo from './todo/NewTodo';
import TodoList from './todo/ListTodo';

const Dashboard = ({ setAuth }) => {
  const [name, setName] = useState('');
  const [allTodos, setAllTodos] = useState([]);
  const [todosChange, setTodosChange] = useState(false);

  const logout = async (e) => {
    e.preventDefault();
    try {
      localStorage.removeItem('token');
      setAuth(false);
      toast.success('Logout successfully');
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    const getProfile = async () => {
      try {
        const res = await fetch('http://localhost:5000/dashboard/', {
          method: 'GET',
          headers: { jwt_token: localStorage.getItem('token') },
        });

        const data = await res.json();
        // [{"user_name":"test3","todo_id":5,"description":"go to bed now"}]

        setName(data[0].user_name);
        setAllTodos(data);
      } catch (err) {
        console.error(err.message);
      }
    };

    getProfile();
  }, [todosChange]);

  return (
    <div>
      <div className="d-flex mt-5 justify-content-around">
        <h2>{name} 's todo List</h2>
        <button onClick={(e) => logout(e)} className="btn btn-primary">
          Logout
        </button>
      </div>

      <NewTodo setTodosChange={setTodosChange} />
      <TodoList allTodos={allTodos} setTodosChange={setTodosChange} />
    </div>
  );
};

export default Dashboard;
