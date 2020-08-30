import React, { useState } from 'react';
import { db } from '../../services/firebase'
import './InputsRessources.css'
import loader from '../../assets/loader.gif'
import Alert from '../Alert/Alert';
const InputsRessources = () => {
	// o--^o> vroom vroom
	const [state, setState] = useState({
		lien: "",
		nom: "",
		color: "#e66465"
	})
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
		return true
	}
	const handleAlert = (message, severity) => {
		setAlertData({ message, severity })
		setOpenAlert(true)
	}
	const handleSubmit = (e) => {
		e.preventDefault()
		if (isValidUrl(lien) === false) {
			setInputsState({
				lien: true,
				nom: false
			})
			handleAlert("Lien non valide !", "error")
		} else if (nom.trim().length != 0) {
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
		} else {
			setInputsState({ lien: false, nom: true })
			handleAlert("Titre de la ressource manquant !", "error")
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
					<label>Ressource</label>
					<input className={`text-input ${inputsState.lien ? "error" : null}`} type="text" name="lien" onChange={handleChange} placeholder="Écrire ici" value={lien}></input>
				</div>
				<div>
					<label>Titre</label>
					<input className={`text-input ${inputsState.nom ? "error" : null}`} type="text" name="nom" onChange={handleChange} placeholder="Écrire ici" value={nom}></input>
				</div>
				<div>
					<label>Couleur</label>
					<input className="color-picker" type="color" name="color"
						value={color} onChange={handleChange} />
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

export default InputsRessources;