import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import './NavBar.css'
import {ReactComponent as Svg} from '../../images/logo.svg'

const NavBar = ({user}) => {
  return (
    <nav>
      {user?
      <>
        <Svg className='nav-logo'/>
        <div className='nav-links'>
          <NavLink to='/home'>Home</NavLink>
          <NavLink to={`/user/${user.username}`}>Profile</NavLink>
          <NavLink to={`/user/${user.username}/animelist`}>Anime List</NavLink>
          <NavLink to={`/browse/anime`}>Browse</NavLink>
        </div>
        <div className='auth'>
          <LogoutButton/>
        </div>
      </>

      :
      <>
        <Svg className='nav-logo'/>
        <div className='nav-links'>
          <NavLink to='/browse/anime'>Browse</NavLink>
        </div>
        <div className='auth'>
          <NavLink to='/login'>Login</NavLink>
          <NavLink className='signup' to='/signup'>Sign Up</NavLink>
        </div>
      </>
      }
    </nav>
  )
}

export default NavBar;
