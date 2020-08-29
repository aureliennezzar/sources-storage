import React, { useEffect, useState } from 'react';
import warningIcon from '../../assets/warning.svg'
import errorIcon from '../../assets/error.svg'
import infosIcon from '../../assets/infos.svg'
import successIcon from '../../assets/success.svg'
import './Alert.css'

const Alert = ({ open, autoHideDuration = 3000, onClose, severity, children }) => {

	const [severityImage, setSeverityImage] = useState(infosIcon)
	const [closing, setClosing] = useState(0)
	const [autoHide, setAutoHide] = useState()
	const [style, setStyle] = useState({})

	useEffect(() => {
		//Change the style of the alert depending of the severity
		switch (severity) {
			case "error":
				setStyle({ background: "#A63D40" })
				setSeverityImage(errorIcon)
				break;
			case "warning":
				setStyle({ background: "#E9B872" })
				setSeverityImage(warningIcon)
				break;
			case "infos":
				setStyle({ background: "#6494AA" })
				setSeverityImage(infosIcon)
				break;
			case "success":
				setStyle({ background: "#90A959" })
				setSeverityImage(successIcon)
				break;

			default:
				setStyle({ background: "#6494AA" })
				break;
		}
		//If Alert is active then start the "auto hide" timeout
		if (open) {
			setAutoHide(
				setTimeout(() => {
					setClosing(1)
				}, autoHideDuration))
		}
	}, [open])


	return (
		<>
			{open
				? <div
					className="alert-card"
					style={style}
					//Add closing attribute to trigger css animation
					close={closing}
					onAnimationEnd={(e) => {
						//If the closing animation is finished, clear the timeout, reset the closing state and close the alert.
						if (closing) {
							setClosing(0)
							clearTimeout(autoHide)
							onClose()
						}
					}}>
					<img src={severityImage}></img>
					<p>{children}</p>
					<span onClick={() => setClosing(1)}>X</span>
				</div>
				: null
			}
		</>
	);
}

export default Alert;