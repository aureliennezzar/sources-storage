import React, { useState, useEffect, Fragment } from 'react';
import { db } from '../../services/firebase'
import Ressource from '../Ressource/Ressource';
import './RessourcesList.css'

const RessourcesList = () => {
	const [ressources, setRessources] = useState([]);
	useEffect(() => {
		db.collection("ressources").onSnapshot((querySnapshot) => {
			//Empty items
			setRessources([])
			//Recovery of documents saved on the ressources database
			querySnapshot.forEach((doc) => {
				const { lien, nom, color } = doc.data()
				//Data retrieval of each ressource
				setRessources(oldArray => [...oldArray, { lien, titre: nom, color }]);
			});
		});
	}, [])

	return (
		<div className="ressources">
			{ressources.map((ressource, i) => {
				const { nom, lien, titre, color } = ressource
				return <Ressource key={i} titre={titre} lien={lien} color={color} ></Ressource>
			})}
		</div>
	);
}

export default RessourcesList;