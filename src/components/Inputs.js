import React, { useState, useEffect } from 'react';
import { db } from '../services/firebase'
import './Inputs.css'
const Inputs = () => {
    const [state, setState] = useState({
        lien: "",
        nom: "",
    })
    const [inputsState, setInputsState] = useState({
        lien: false,
        nom: false
    })
    const { lien, nom, } = state

    const isFeedValid = (lien) => {
        //Fonction qui test si un lien est un flux rss ou non
        const parser = new DOMParser();
        const validator = "https://cors-anywhere.herokuapp.com/" + `http://validator.w3.org/feed/check.cgi?url=${lien}&output=soap12`
        return new Promise((resolve, reject) => {
            var request = new XMLHttpRequest()
            request.open('GET', validator, true)
            request.onload = function () {
                const xmlDoc = parser.parseFromString(this.response, "text/xml");
                //Si le lien est valide retourne la validité du lien sinon retourne False
                xmlDoc.querySelector('faultcode') === null
                    ? resolve(xmlDoc.querySelector('validity').innerHTML)
                    : resolve('false')
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
        return new Object({ lien: newtab[0], nom: newtab[1] })
    }

    const handleClick = () => {
        //Si un des inputs est vide sort de la fonction
        if (state.lien.length > 0 && state.nom.length > 0) {
            isFeedValid(lien)
                .then((result) => {
                    if (JSON.parse(result)) {
                        //Si un le lien est valide alors creer un nouveau document dans la bdd RSS
                        db.collection("rss").add({
                            lien,
                            nom
                        })
                        alert("FLUX RSS AJOUTÉ");
                    } else {

                        setInputsState({
                            lien: true,
                            nom:false
                        })
                        // alert("FLUX RSS NON VALIDE");
                    }
                })
            //Vide les inputs


        } else setInputsState(checkEmpty(state))

        setState({
            ...state,
            lien: "",
            nom: ""
        })
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

    return (
        <div className="inputs">
            <input style={inputsState.lien ? { border: "red 2px solid" } : null} type="text" name="lien" onChange={handleChange} placeholder="Lien" value={lien}></input>
            <input style={inputsState.nom ? { border: "red 2px solid" } : null} type="text" name="nom" onChange={handleChange} placeholder="Nom de la source" value={nom}></input>
            <button onClick={handleClick}>Ajouter</button>
        </div>
    );
}

export default Inputs;