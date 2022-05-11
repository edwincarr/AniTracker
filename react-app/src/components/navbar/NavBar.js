import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';

const NavBar = ({user}) => {
  return (
    <nav>
      {user?
      <>
        <NavLink to='/home'>Home</NavLink>
        <NavLink to={`/user/${user.username}`}>Profile</NavLink>
        <NavLink to={`/user/${user.username}/animelist`}>Anime List</NavLink>
        <NavLink to={`/browse/anime`}>Browse</NavLink>
        <LogoutButton/>
      </>
      :
      <>
        <NavLink to='/browse/anime'>Browse</NavLink>
        <NavLink to='/login'>Login</NavLink>
        <NavLink to='/signup'>Signup</NavLink>
      </>
      }
    </nav>
  )
}

export default NavBar;
