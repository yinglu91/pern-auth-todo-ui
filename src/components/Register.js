import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import todoAPI from '../api/todoAPI'
import { toast } from 'react-toastify';

const Register = ({ setAuth }) => {
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
    name: '',
  });

  const { email, password, name } = inputs;

  const onChange = (e) =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });

  const onSubmitForm = async (e) => {
    e.preventDefault();

    // validation...

    try {
      const body = { email, password, name };
      const options = {
        headers: {
          'Content-type': 'application/json',
        },
      };

      const response = await todoAPI.post('/authentication/register', body, options);

      const { data } = response;
      if (data.jwtToken) {
        localStorage.setItem('token', data.jwtToken);
        setAuth(true);
        toast.success('Register Successfully');
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
      <h1 className="mt-5 text-center">Register</h1>
      <form onSubmit={onSubmitForm}>
        <input
          type="text"
          name="email"
          value={email}
          placeholder="email"
          onChange={(e) => onChange(e)}
          className="form-control my-3"
        />
        <input
          type="password"
          name="password"
          value={password}
          placeholder="password"
          onChange={(e) => onChange(e)}
          className="form-control my-3"
        />
        <input
          type="text"
          name="name"
          value={name}
          placeholder="name"
          onChange={(e) => onChange(e)}
          className="form-control my-3"
        />
        <button className="btn btn-success btn-block">Submit</button>
      </form>
      <Link to="/login">login</Link>
    </Fragment>
  );
};

export default Register;
