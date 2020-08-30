import React, { useEffect, useState } from 'react';
import './Ressource.css'
const Ressource = ({ titre, lien, date, color }) => {
	const [open, setOpen] = useState(false)
	
	const handleClick = (e) => {
		//Open the link in a new tab
		if (open) {
			window.open(lien, '_blank');
			e.currentTarget.classList.remove("ressourceClick")
		}
	}

	const addStyle = (e) => {
		setOpen(true)
		e.currentTarget.classList.add("ressourceClick")
	}
	const removeStyle = (e) => {
		setOpen(false)
		e.currentTarget.classList.remove("ressourceClick")
	}
	return (<article className="ressource-card" onMouseUp={handleClick} onMouseDown={addStyle} onMouseLeave={removeStyle}>
		<span className="ressource-badge" style={{ background: color }}></span>
		<p className="ressource-name">{titre}</p>
	</article>);
}

export default Ressource;