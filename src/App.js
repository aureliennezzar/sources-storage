import React, { useEffect, useState } from 'react';
import './App.css';
import { PublicRoute } from './routes/PublicRoute';
import {
  BrowserRouter as Router,
  Switch
} from "react-router-dom";
import FeedPage from './components/FeedPage/FeedPage';
import { auth } from 'firebase';
import RessourcesPage from './components/RessourcesPage/RessourcesPage';
import PageNotFound from './PageNotFound';
import Nav from './components/Nav/Nav';

function App() {
  const [authenticated, setAuthenticated] = useState(false)

  useEffect(() => {
    auth().onAuthStateChanged((user) => {
      if (user) {
        setAuthenticated(true)
      }
    })
  }, []);
  return (
    <>
      <div className="App">
		  <Nav />
        <header>
          <h1>Welcome to Sources Storage</h1>
        </header>
      </div>
      <Router>
        <Switch>
          <PublicRoute exact path="/" authenticated={authenticated} component={FeedPage}></PublicRoute>
          <PublicRoute path="/feed" authenticated={authenticated} component={FeedPage}></PublicRoute>
          <PublicRoute path="/ressources" authenticated={authenticated} component={RessourcesPage}></PublicRoute>
          <PublicRoute path="*" authenticated={authenticated} component={PageNotFound}></PublicRoute>
        </Switch>
      </Router>
    </>

  );
}

export default App;
