import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
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
      <Switch>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/signup' exact={true}>
          <SignUpForm />
        </Route>
        <Route path='/home'>
          <Activity feed={feed}/>
        </Route>
        <Route path='/browse/anime'>
          <Browse />
        </Route>
        <Route path='/anime/:animeid'>
          <AnimePage />
        </Route>
        <Route path='/user/:userid' exact={true}>
          <ProfilePage />
        </Route>
        <Route path='/user/:userid/animelist' exact={true}>
          <AnimeList/>
        </Route>
        {user ?
        <Route>
          <Redirect to='/browse/anime' />
        </Route>
        :
        <Route path='/' exact={true}>
          <Splash />
        </Route>
        }
        <Route>
          <Redirect to='/browse/anime' />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
