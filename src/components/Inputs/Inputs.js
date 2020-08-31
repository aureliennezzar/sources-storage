import React, { useState, useEffect } from 'react';
import { db } from '../../services/firebase'
import './Inputs.css'
import loader from '../../assets/loader.gif'
import Alert from '../Alert/Alert';
const Inputs = ({ type }) => {
	// o--^o> vroom vroom
	useEffect(()=>{
		return ()=>{
			setIsSubscribe(false)
		}
	},[])
	const [state, setState] = useState({
		lien: "",
		nom: "",
		color: "#e66465"
	})
	const [isSubscribe, setIsSubscribe] = useState(true)
	const [openAlert, setOpenAlert] = useState(false)
	const [alertData, setAlertData] = useState({ message: "", severity: "" })
	const [isSending, setIsSending] = useState(false)
	const [inputsState, setInputsState] = useState({
		lien: false,
		nom: false
	})
	const { lien, nom, color } = state

	function isValidUrl(string) {
		try {
			new URL(string);
		} catch (_) {
			return false;
		}
	}

	const isFeedValid = (lien) => {
		//Fonction qui test si un lien est un flux rss ou non
		setIsSending(true)
		const parser = new DOMParser();
		const validator = `https://cors-anywhere.herokuapp.com/http://validator.w3.org/feed/check.cgi?url=${lien}&output=soap12`
		return new Promise((resolve, reject) => {
			var request = new XMLHttpRequest()
			request.open('GET', validator, true)
			request.onload = function () {
				const xmlDoc = parser.parseFromString(this.response, "text/xml");
				//Si le lien est valide retourne la validité du lien sinon retourne False
				try {
					resolve(JSON.parse(xmlDoc.querySelector('validity').innerHTML))
				} catch{
					resolve(false)
				}

			}
			if (isSubscribe) request.send()

		})
	}

	const handleAlert = (message, severity) => {
		setAlertData({ message, severity })
		setOpenAlert(true)
	}
	
	const handleSubmit = (e) => {
		e.preventDefault()

		//If one of the inputs is empty, exit the function
		if (isValidUrl(lien) === false) {
			setInputsState({
				lien: true,
				nom: false
			})
			type
				? handleAlert("Flux RSS non valide !", "error")
				: handleAlert("Lien non valide !", "error")

		} else if (nom.trim().length > 0) {
			if (type) {
				isFeedValid(lien)
					.then((result) => {
						if (isSubscribe) {
							setIsSending(false)
							if (result) {
								//If a link is valid then create a new document in the RSS database
								db.collection("rss").add({
									lien,
									nom,
									color
								})
								setState({
									...state,
									lien: "",
									nom: "",
									color: "#e66465"
								})
								handleAlert("Flux RSS ajouté !", "success")
							} else {
								setInputsState({
									lien: true,
									nom: false
								})
								handleAlert("Flux RSS non valide !", "error")
							}
						}
					})
			} else {
				db.collection("ressources").add({
					lien,
					nom,
					color
				})
				setState({
					...state,
					lien: "",
					nom: "",
					color: "#e66465"
				})
				handleAlert("Ressource ajoutée !", "success")
			}
		} else {
			setInputsState({ lien: false, nom: true })
			type
				? handleAlert("Nom de média manquant !", "error")
				: handleAlert("Titre de la ressource manquant !", "error")

		}

	}
	const handleChange = (e) => {
		setInputsState({
			lien: false,
			nom: false
		})
		setState({
			...state,
			[e.target.name]: e.target.value,
		})

	}
	const handleClose = (e) => {
		setOpenAlert(false)
	}
	return (
		<>
			<form className="inputs"
				onSubmit={handleSubmit}>
				<div>
					<label>{type ? "Média" : "Ressource"}</label>
					<input className={`text-input ${inputsState.lien ? "error" : null}`} type="text" name="lien" onChange={handleChange} placeholder="Écrire ici" value={lien}></input>
				</div>
				<div>
					<label>{type ? "Nom du flux" : "Titre"}</label>
					<input className={`text-input ${inputsState.nom ? "error" : null}`} type="text" name="nom" onChange={handleChange} placeholder="Écrire ici" value={nom}></input>
				</div>
				<div>
					<label>Couleur</label>
					<input className="color-picker" type="color" name="color"
						value={color} onChange={handleChange} />
				</div>

				{isSending
					? <button disabled={true} className="inputs-button"><img alt="Loading animation" src={loader}></img></button>
					: <button className="submit-button inputs-button" type="submit"><span>+</span></button>
				}
			</form>

			<Alert
				open={openAlert}
				onClose={handleClose}
				severity={alertData.severity}>
				{alertData.message}
			</Alert>

		</>
	);
}

export default Inputs;