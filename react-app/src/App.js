import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes, Navigate} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/navbar/NavBar.js';
import { authenticate } from './store/session';
import Browse from './components/browsing';
import AnimePage from './components/anime_page';
import AnimeList from './components/anime_list';
import Splash from './components/splash_page';
import Activity from './components/activity_feed';
import ProfilePage from './components/profile_page';
import { getting_followings } from './store/following';
import { getting_feed } from './store/feed';

function App() {
  const [loaded, setLoaded] = useState(false);
  const user = useSelector(state => state.session.user)
  const feed = useSelector(state => state.feed)
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
    dispatch(getting_followings())
    dispatch(getting_feed())
  }, [dispatch]);

  if (!loaded) {
    return null;
  }


  return (
    <BrowserRouter>
      <NavBar user={user}/>
      <Routes>
        <Route path='/login' exact={true} element={<LoginForm/>} />
        <Route path='/signup' exact={true} element={<SignUpForm/>} />
        <Route path='/browse/anime' element={<Browse/>} />
        <Route path='/anime/:animeid' element={<AnimePage/>} />
        <Route path='/user/:userid' exact={true} element={<ProfilePage/>} />
        <Route path='/user/:userid/animelist' exact={true} element={<AnimeList/>} />
        {user ?
        <>
          <Route path='/' element={<Navigate to='/home' replace />} />
          <Route path='/home' element={<Activity feed={feed}/>} />
        </>
        :
        <Route path='/' exact={true} element={<Splash/>} />
        }
        <Route path="*" element={<Navigate to='/' replace/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
