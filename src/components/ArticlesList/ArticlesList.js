import React, { useState, useEffect, Fragment } from 'react';
import { db } from '../../services/firebase'
import Article from '../Article/Article';
import './ArticlesList.css'
import ArticleSkeleton from '../ArticleSkeleton/ArticleSkeleton';

const ArticlesList = () => {
	const [articles, setArticles] = useState([]);
	const [articlesSkeleton, setArticlesSkeleton] = useState([])
	const [skelEnabled, setSkelEnabled] = useState(true)
	useEffect(() => {
		//Addition of the skeleton for the articles
		for (let i = 0; i < 50; i++) {
			setArticlesSkeleton(oldArray => [...oldArray, <ArticleSkeleton />]);
		}
		db.collection("rss").onSnapshot((querySnapshot) => {
			//Empty items
			setArticles([])
			setSkelEnabled(true)
			//Recovery of documents saved on the RSS database
			querySnapshot.forEach((doc) => {
				const { lien, nom, color } = doc.data()
				//Data retrieval of each RSS feed
				const RSS_URL = "https://cors-anywhere.herokuapp.com/" + lien;
				fetch(RSS_URL)
					.then(response => response.text())
					.then(str => new window.DOMParser().parseFromString(str, "text/xml"))
					.then(data => {
						const items = data.querySelectorAll("item");
						//Once the data of the first feed has been received, remove the skeleton
						if (skelEnabled) {
							setSkelEnabled(false)
						}

						items.forEach(item => {
							//Recovery of the title, link and publication date of each item
							const titre = item.querySelector("title").innerHTML
							const lien = item.querySelector("link").innerHTML
							const date = item.querySelector("pubDate").innerHTML
							//State update
							setArticles(oldArray => [...oldArray, { titre, lien, nom, date, color }]);
						})
					})
			});
		});
	}, [])

	return (
		<div className="articles">
			{skelEnabled
				? articlesSkeleton.map((e, i) => {
					return <Fragment key={i}>
						{e}
					</Fragment>
				})
				: articles.map((article, i) => {
					const { titre, lien, nom, date, color } = article
					return <Article key={i} titre={titre} lien={lien} from={nom} date={date} color={color} ></Article>
				})
			}
		</div>
	);
}

export default ArticlesList;