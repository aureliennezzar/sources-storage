import React from 'react';
import './App.css';
import ArticlesList from './components/ArticlesList';
import Inputs from './components/Inputs';

function App() {

  return (
    <div className="App">
      <h1>Welcome to Sources Storage</h1>
      <Inputs />
      <ArticlesList />
    </div>
  );
}

export default App;
