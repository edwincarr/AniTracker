import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import './NavBar.css'
import {ReactComponent as Svg} from '../../images/logo.svg'
import { useDispatch } from 'react-redux';
import { getting_feed } from '../../store/feed';

const NavBar = ({user}) => {
  const dispatch = useDispatch()
  const click = () => {
    dispatch(getting_feed())
  }
  const home = window.location.href.split('/')[3]
  return (
    <nav>
      {user?
      <div className='nav'>
      <NavLink to='/home'>
        <Svg className='nav-logo' onClick={home === 'home' ? null : click}/>
      </NavLink>
        <div className='nav-links'>
          <NavLink to={`/home`}  onClick={home === 'home' ? null : click}>Home</NavLink>
          <NavLink to={`/user/${user.id}`}>Profile</NavLink>
          <NavLink to={`/user/${user.id}/animelist`}>Anime List</NavLink>
          <NavLink to={`/browse/anime`}>Browse</NavLink>
        </div>
        <div className='auth'>
          <LogoutButton/>
        </div>
      </div>

      :
      <div className='nav'>
      <NavLink to='/'>
        <Svg className='nav-logo'/>
      </NavLink>
        <div className='nav-links'>
          <NavLink to='/browse/anime'>Browse</NavLink>
        </div>
        <div className='auth'>
          <NavLink to='/login'>Login</NavLink>
          <NavLink className='signup' to='/signup'>Sign Up</NavLink>
        </div>
      </div>
      }
    </nav>
  )
}

export default NavBar;
