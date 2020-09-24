import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import todoAPI from '../api/todoAPI'
import { toast } from 'react-toastify';

const Login = ({ setAuth }) => {
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
  });

  const { email, password } = inputs;

  const onChange = (e) =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { email, password };
      const options = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const response = await todoAPI.post(
        '/authentication/login',
        body,
        options
      );

      const { data } = response;

      if (data.jwtToken) {
        localStorage.setItem('token', data.jwtToken);
        setAuth(true);
        toast.success('Logged in Successfully');
      } else {
        setAuth(false);
        toast.error(data);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      <h1 className="mt-5 text-center">Login</h1>
      <form onSubmit={onSubmitForm}>
        <input
          type="text"
          name="email"
          value={email}
          onChange={(e) => onChange(e)}
          className="form-control my-3"
        />
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => onChange(e)}
          className="form-control my-3"
        />
        <button className="btn btn-success btn-block">Submit</button>
      </form>
      <Link to="/register">register</Link>
    </Fragment>
  );
};

export default Login;
