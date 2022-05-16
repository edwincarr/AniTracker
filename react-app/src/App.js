import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/navbar/NavBar.js';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { authenticate } from './store/session';
import Browse from './components/browsing';
import AnimePage from './components/anime_page';
import AnimeList from './components/anime_list';
import ProfilePage from './components/profile_page';
import Splash from './components/splash_page';
import { get_user_list } from './store/user_list';

function App() {
  const [loaded, setLoaded] = useState(false);
  const user = useSelector(state => state.session.user)
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
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
        <ProtectedRoute path='/home' exact={true}>

        </ProtectedRoute>
        <Route path={user ? '/home' : '/'} exact={true}>
          <Splash />
        </Route>
        <Route>
          <Redirect to='/home' />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
