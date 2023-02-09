import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../store/session';

const LogoutButton = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const onLogout = async (e) => {
    navigate('/')
    await dispatch(logout());
    navigate('/')
  };

  return <button className='logout-button' onClick={onLogout}>Logout</button>;
};

export default LogoutButton;
