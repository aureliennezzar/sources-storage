import React, { useState, useEffect } from 'react';
import { db } from './services/firebase'
import './App.css';
import Article from './components/Article';

function App() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    db.collection("rss").get().then((querySnapshot) => {

      querySnapshot.forEach((doc) => {
        const { lien, nom } = doc.data()

        const RSS_URL = "https://cors-anywhere.herokuapp.com/" + lien;
        fetch(RSS_URL)
          .then(response => response.text())
          .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
          .then(data => {
            const items = data.querySelectorAll("item");
            items.forEach(item => {
              const titre = item.querySelector("title").innerHTML
              const lien = item.querySelector("link").innerHTML
              const date = item.querySelector("pubDate").innerHTML
              setArticles(oldArray => [...oldArray, { titre, lien, nom, date }]);
            })
          })
      });
    });
  }, [])

  return (
    <div className="App">
      <h1>Welcome to Sources Storage</h1>
      <div className="articles">
        {articles.map((article, i) => {
          const { titre, lien, nom, date } = article
          return <Article key={i} titre={titre} lien={lien} from={nom} date={date} ></Article>
        })}
      </div>
    </div>
  );
}

export default App;
