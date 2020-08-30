import React, { useState, useEffect, Fragment } from 'react';
import { db } from '../../services/firebase'
import './List.css'
import SkeletonItem from '../SkeletonItem/SkeletonItem';

const List = ({ type, ElementComp }) => {
	const [elements, setElements] = useState([]);
	const [articlesSkeleton, setArticlesSkeleton] = useState([])
	const [skelEnabled, setSkelEnabled] = useState(type ? true : false)

	useEffect(() => {
		let isSubscribed = true
		//Addition of the skeleton for the articles
		if (type) {
			for (let i = 0; i < 50; i++) {
				setArticlesSkeleton(oldArray => [...oldArray, <SkeletonItem />]);
			}
		}
		const unsubscribe = db.collection(type ? "rss" : "ressources").onSnapshot((querySnapshot) => {
			//Empty items
			setElements([])
			if (type) { setSkelEnabled(true) }

			//Recovery of documents saved on the RSS database
			querySnapshot.forEach((doc) => {
				const { lien, nom, color } = doc.data()
				if (type) {
					//Data retrieval of each RSS feed
					const RSS_URL = "https://cors-anywhere.herokuapp.com/" + lien;
					fetch(RSS_URL)
						.then(response => response.text())
						.then(str => new window.DOMParser().parseFromString(str, "text/xml"))
						.then(data => {
							if (isSubscribed) {
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
									setElements(oldArray => [...oldArray, { titre, lien, nom, date, color }]);
								})
							}
						})
				} else {
					setElements(oldArray => [...oldArray, { lien, titre: nom, color }]);
				}

			});
		});
		return () => {
			//unsubscribe the listener here
			unsubscribe()
			isSubscribed = false
		}


		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<div className={type ? "articles" : "ressources"}>
			{skelEnabled
				? articlesSkeleton.map((e, i) => {
					return <Fragment key={i}>
						{e}
					</Fragment>
				})
				: elements.map((element, i) => {
					const { titre, lien, nom, date, color } = element
					return <ElementComp key={i} titre={titre} lien={lien} from={nom} date={date} color={color} ></ElementComp>
				})
			}
		</div>
	);
}

export default List;