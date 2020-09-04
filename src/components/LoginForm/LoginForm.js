import React, { useState, useEffect } from 'react';
import './LoginForm.css'
import { auth } from '../../services/firebase';
import { signIn } from '../../scripts/auth';
import { Redirect } from 'react-router-dom';

const LoginForm = (props) => {
	const setClose= props.close
	const [state, setState] = useState({
		username: "",
		password: ""
	})
	const [error, setError] = useState(false)
	const { username, password } = state
	const handleChange = (e) => {
		setState({
			...state,
			[e.target.name]: e.target.value
		})
		if (error) setError(false)
	}
	const handleSubmit = (e) => {
		setState({ username: "", password: "" })
		e.preventDefault()
		signIn(username, password).then((success) => {
				setClose(false)
		}).catch((error) => {
			setError(true)
		})

	}
	return (

		<form className="login-form"
			onSubmit={handleSubmit}>
			<div>
				<label>Nom d'utilisateur</label>
				<input type="text" placeholder="Écrire ici" name="username" value={username} onChange={handleChange} className={error ? 'error' : null}></input>
			</div>
			<div>
				<label>Mot de passe</label>
				<input type="password" placeholder="Écrire ici" name="password" value={password} onChange={handleChange} className={error ? 'error' : null}></input>

			</div>
			<div>

				<button type="submit">Se connecter</button>
			</div>
		</form>
	);
}

export default LoginForm;