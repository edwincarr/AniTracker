import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/navbar/NavBar.js';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { authenticate } from './store/session';

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

        </Route>
        <Route path='/anime/:animeid'>

        </Route>
        <Route path='/user/:username' exact={true}>

        </Route>
        <Route path='/user/:username/animelist' exact={true}>

        </Route>
        <ProtectedRoute path='/home' exact={true}>

        </ProtectedRoute>
        <Route path='/'>
          404 - page not found
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
