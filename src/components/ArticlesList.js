import React, { useState, useEffect } from 'react';
import { db } from '../services/firebase'
import Article from './Article';

const ArticlesList = () => {
    const [articles, setArticles] = useState([]);
  
    useEffect(() => {
      db.collection("rss").get().then((querySnapshot) => {
        //Recuperation des documents enregistés sur la bdd RSS
        querySnapshot.forEach((doc) => {
          const { lien, nom } = doc.data()
          //Recuperation des données de chaque feed RSS
  
          const RSS_URL = "https://cors-anywhere.herokuapp.com/" + lien;
          fetch(RSS_URL)
            .then(response => response.text())
            .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
            .then(data => {
              const items = data.querySelectorAll("item");
              
              items.forEach(item => {
                //Recuperation du titre, du lien et de la date de publication de chaque item
                const titre = item.querySelector("title").innerHTML
                const lien = item.querySelector("link").innerHTML
                const date = item.querySelector("pubDate").innerHTML
                
                //Actualisation du state
                setArticles(oldArray => [...oldArray, { titre, lien, nom, date }]);
              })
            })
        });
      });
    }, [])
    return (
        <div className="articles">
            {articles.map((article, i) => {
                const { titre, lien, nom, date } = article
                return <Article key={i} titre={titre} lien={lien} from={nom} date={date} ></Article>
            })}
        </div>
    );
}

export default ArticlesList;