import React, { useEffect, useState } from 'react';
import warningIcon from '../../assets/warning.svg'
import errorIcon from '../../assets/error.svg'
import infosIcon from '../../assets/infos.svg'
import successIcon from '../../assets/success.svg'
import './Alert.css'

const Alert = ({ open, autoHideDuration = 3000, onClose, severity, children }) => {
	const [closing, setClosing] = useState(0)
	const [style, setStyle] = useState({})
	const [severityImage, setSeverityImage] = useState(infosIcon)
	useEffect(() => {
		console.log(closing)
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
		if (open) {
			setTimeout(() => {
				
				setClosing(1)
				console.log('fermeture')
			}, autoHideDuration);
		}
	}, [open, severity])
	

	return (
		<>
			{open
				? <div
					className="alert-card"
					style={style}
					close={closing}
				
					onAnimationEnd={(e) => {
						if (closing) {
							setClosing(0)
							onClose()


						}

					}}>

					<img src={severityImage}></img>
					<p>{children}</p>
					<span onClick={()=> setClosing(1)}>X</span>
				</div>
				: null
			}
		</>
	);
}

export default Alert;