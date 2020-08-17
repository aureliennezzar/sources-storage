import React, { useState } from 'react';
import { db } from '../services/firebase'
import './Inputs.css'
const Inputs = () => {
    const [state, setState] = useState({
        lien: "",
        nom: ""
    })
    const { lien, nom } = state
    const handleClick = () => {
        db.collection("rss").add({
            lien,
            nom
        })
        setState({
            lien: "",
            nom: ""
        })
    }
    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
        })

    }
    return (
        <div className="inputs">
            <input type="text" name="lien" onChange={handleChange} placeholder="Lien" value={lien}></input>
            <input type="text" name="nom" onChange={handleChange} placeholder="Nom de la source" value={nom}></input>
            <button onClick={handleClick}>Ajouter</button>
        </div>
    );
}

export default Inputs;