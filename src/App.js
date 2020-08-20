import React from 'react';
import './App.css';
import ArticlesList from './components/ArticlesList';
import Inputs from './components/Inputs';

function App() {

  return (
    <div className="App">
      <header>
        <h1>Welcome to Sources Storage</h1>
        <Inputs />
      </header>

      <ArticlesList />
    </div>
  );
}

export default App;
