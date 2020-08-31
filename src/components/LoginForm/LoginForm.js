import React, { useState, useEffect } from 'react';
import './LoginForm.css'
import { auth } from '../../services/firebase';
import { signIn } from '../../scripts/auth';

const LoginForm = () => {
	const [state, setState] = useState({
		username: "",
		password: ""
	})
	const { username, password } = state
	const handleChange = (e) => {
		setState({
			...state,
			[e.target.name]: e.target.value
		})
	}
	const handleSubmit = (e) => {
		e.preventDefault()
		signIn(username, password)
	}
	return (
		<form className="login-form"
			onSubmit={handleSubmit}>
			<input type="text" placeholder="Nom d'utilisateur" name="username" value={username} onChange={handleChange}></input>
			<input type="password" placeholder="Mot de passe" name="password" value={password} onChange={handleChange}></input>
			<button type="submit">Se Connecter</button>
		</form>
	);
}

export default LoginForm;