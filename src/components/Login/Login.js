import React, { useEffect, useState } from 'react';
import './Login.css'
import LoginForm from '../LoginForm/LoginForm';
import userImage from '../../assets/user.png'

const Login = () => {
	const [isOpen, setIsOpen] = useState()
	const [button, setButton] = useState()
	const [btnImage, setBtnImage] = useState()
	const [style, setStyle] = useState({})
	useEffect(() => {
		setButton(document.querySelector('.login-btn'))
		setBtnImage(document.querySelector('.login-btn img'))
		//Initiate root value and set default animation scale for login-btn
		let root = document.documentElement;
		const btnSize = 150

		//1.45 -> the scale for a circle to entire fill the screen
		root.style.setProperty('--scale-value', Math.max(window.innerHeight, window.innerWidth) / 100 * 1.45);
		root.style.setProperty('--btn-size', btnSize + "px");

		//listen for resize and change dynamically the scale value
		window.addEventListener('resize', () => {
			const windowScale = Math.max(window.innerHeight, window.innerWidth)
			root.style.setProperty('--scale-value', windowScale / btnSize * 1.45);
		})

	}, [])
	const handleClick = () => {
		if (!isOpen) {
			btnImage.style.display = "none"
			button.classList.toggle('animate-login')
		}
	}
	const handleAnimationEnd = () => {
		setStyle({
			width: '100vw',
			height: "100vh",
			borderRadius: "0",
			transform: "translate(0)",
			boxShadow: "none"
		})

		if (!isOpen) {
			setIsOpen(true)
		}
		button.classList.toggle('animate-login')
	}
	return (
		<div className="login-btn-wrapper" onClick={handleClick} onAnimationEnd={handleAnimationEnd}>
			<div className="login-btn" style={style}>
				{isOpen
					? <LoginForm />
					: null
				}
				<img src={userImage}></img>
			</div>
		</div>);
}

export default Login;