import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Navigate } from 'react-router-dom';
import { signUp } from '../../store/session';
import './auth.css'

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
      const data = await dispatch(signUp(username, email, password, repeatPassword));
      if (data) {
        setErrors(data)
      }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Navigate to='/browse/anime' />;
  }

  return (
    <div className='form-bg'>
      <form className='auth-forms' onSubmit={onSignUp}>
        <h1>Sign Up</h1>
        <div className='input-con'>
          <input
            type='text'
            name='username'
            placeholder='Username'
            onChange={updateUsername}
            value={username}
            ></input>
          <div className='errs'>
            {errors.username}
          </div>
        </div>
        <div className='input-con'>
          <input
            type='text'
            name='email'
            placeholder='Email'
            onChange={updateEmail}
            value={email}
            ></input>
          <div className='errs'>
            {errors.email}
          </div>
        </div>
        <div className='input-con'>
          <input
            type='password'
            name='password'
            placeholder='Pasword'
            onChange={updatePassword}
            value={password}
            ></input>
          <div className='errs'>
            {errors.password}
          </div>
        </div>
        <div className='input-con'>
          <input
            type='password'
            name='repeat_password'
            placeholder='Repeat Password'
            onChange={updateRepeatPassword}
            value={repeatPassword}
            ></input>
          <div className='errs'>
            {errors.confirm}
          </div>
        </div>
        <button type='submit'>Sign Up</button>
      </form>
    </div>
  );
};

export default SignUpForm;
