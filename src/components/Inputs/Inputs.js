import React, { useState } from 'react';
import { db } from '../../services/firebase'
import './Inputs.css'
import loader from '../../assets/loader.gif'
import Alert from '../Alert/Alert';
const Inputs = () => {
	const [state, setState] = useState({
		lien: "",
		nom: "",
	})
	// o--^o> vroom vroom
	const [openAlert, setOpenAlert] = useState(false)
	const [alertData, setAlertData] = useState({message:"",severity:""})
	const [isSending, setIsSending] = useState(false)
	const [inputsState, setInputsState] = useState({
		lien: false,
		nom: false
	})
	const { lien, nom, } = state
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
				xmlDoc.querySelector('faultcode') === null
					? resolve(JSON.parse(xmlDoc.querySelector('validity').innerHTML))
					: resolve(false)

			}
			request.send()
		})
	}

	const checkEmpty = (obj) => {
		let newtab = [obj.lien, obj.nom]
		newtab.forEach((e, i) => {
			if (e.length === 0) {
				newtab[i] = true

			} else {
				newtab[i] = false
			}
		})
		return { lien: newtab[0], nom: newtab[1] }
	}
	const handleAlert = (message, severity) => {
		setAlertData({ message, severity })
		console.log(severity);
		setOpenAlert(true)
	}
	const handleSubmit = (e) => {
		e.preventDefault()
		//Si un des inputs est vide, sort de la fonction
		if (isValidUrl(lien) === false) {
			setInputsState({
				lien: true,
				nom: false
			})
			handleAlert("Flux RSS non valide", "error")
		}
		else if (state.lien.length > 0 && state.nom.length > 0) {
			isFeedValid(lien)
				.then((result) => {
					setIsSending(false)
					if (result) {
						//Si un le lien est valide alors creer un nouveau document dans la bdd RSS
						db.collection("rss").add({
							lien,
							nom
						})
						setState({
							...state,
							lien: "",
							nom: ""
						})
						handleAlert("Flux RSS ajouté", "success")
					} else {
						setInputsState({
							lien: true,
							nom: false
						})
						handleAlert("Flux RSS non valide", "error")
					}
				})
			//Vide les inputs
		} else setInputsState(checkEmpty(state))

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
	const handleClose = () => {
		setOpenAlert(false)
	}
	return (
		<>
			<form className="inputs"
				onSubmit={handleSubmit}>
				<div>
					{/* <label>Lien RSS</label> */}
					<input className={inputsState.lien ? "error" : null} type="text" name="lien" onChange={handleChange} placeholder="Lien RSS " value={lien}></input>
				</div>
				<div>
					{/* <label>Nom du flux</label> */}
					<input className={inputsState.nom ? "error" : null} type="text" name="nom" onChange={handleChange} placeholder="Média " value={nom}></input>
				</div>
				{isSending
					? <button disabled={true} className="inputs-button"><img src={loader}></img></button>
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