import React from 'react';
import './RessourcesPage.css'
import List from '../../components/List/List';
import Ressource from '../../components/Ressource/Ressource';
import Inputs from '../../components/Inputs/Inputs';
const RessourcesPage = () => {
    return (
        <section className="ressourcesPage">
			<Inputs type={0}/>
			<List  type={0} ElementComp={Ressource}/>
        </section>
    );
}

export default RessourcesPage;