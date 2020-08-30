import React from 'react';
import './RessourcesPage.css'
import InputsRessources from '../InputsRessources/InputsRessources';
import RessourcesList from '../RessourcesList/RessourcesList'
const RessourcesPage = () => {
    return (
        <section className="ressourcesPage">
			<InputsRessources />
			<RessourcesList />
        </section>
    );
}

export default RessourcesPage;