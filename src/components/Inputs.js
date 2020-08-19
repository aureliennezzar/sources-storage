import React, { useState } from 'react';
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

    const checkInputs = () => {
        //Check si les inputs sont valides
        let result = true
        const arr = ["lien", "nom"]
        //Creation du nouveau state des inputs
        let newState = {}
        
        //Bocule sur le tableau "arr"
        for (let i = 0; i < 2; i++) {
            //Check si le state.lien et state.nom sont vides ou non
            //Si un des inputs est vide alors modifie le nouveau state
            if (state[arr[i]] === "") {
                newState[arr[i]] = true
                result = false
            } else {
                newState[arr[i]] = false
            }
        }
        //Check si un des inputs a ete declaré comme vide
        if(result===false){
            //Si un des inputs a ete declaré comme vide alors actualise le state et renvoi False
            setInputsState(newState);
            return false
        } else {
            return true
        }
    }
    const handleClick = () => {
        //Si un des inputs est vide sort de la fonction
        if (!checkInputs()) return
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
                    alert("FLUX RSS NON VALIDE");
                }
            })
        //Vide les inputs
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
    return (
        <div className="inputs">
            <input style={inputsState.lien ? { border: "red 2px solid" } : null} type="text" name="lien" onChange={handleChange} placeholder="Lien" value={lien}></input>
            <input style={inputsState.nom ? { border: "red 2px solid" } : null} type="text" name="nom" onChange={handleChange} placeholder="Nom de la source" value={nom}></input>
            <button onClick={handleClick}>Ajouter</button>
        </div>
    );
}

export default Inputs;