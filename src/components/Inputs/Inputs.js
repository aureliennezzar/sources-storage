import React, { useState, useEffect } from 'react';
import { db } from '../../services/firebase'
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
        return {lien: newtab[0], nom: newtab[1]}
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
                        setState({
                            ...state,
                            lien: "",
                            nom: ""
                        })
                        alert("FLUX RSS AJOUTÉ");
                    } else {

                        setInputsState({
                            lien: true,
                            nom: false
                        })

                        alert("FLUX RSS NON VALIDE");
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

    return (
        <div className="inputs">
            <div>
                {/* <label>Lien RSS</label> */}
                <input className={inputsState.lien ? "error" : null} type="text" name="lien" onChange={handleChange} placeholder="Lien RSS " value={lien}></input>
            </div>
            <div>
                {/* <label>Nom du flux</label> */}
                <input className={inputsState.nom ? "error" : null} type="text" name="nom" onChange={handleChange} placeholder="Média " value={nom}></input>
            </div>
            <button onClick={handleClick}><span>+</span></button>
        </div>
    );
}

export default Inputs;