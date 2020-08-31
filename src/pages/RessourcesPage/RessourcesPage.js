import React, { useContext } from 'react';
import './RessourcesPage.css'
import List from '../../components/List/List';
import Ressource from '../../components/Ressource/Ressource';
import Inputs from '../../components/Inputs/Inputs';
import { UserContext } from '../../contexts/UserContext';
const RessourcesPage = () => {
	const userRole = useContext(UserContext)
    return (
        <section className="ressourcesPage">
			{userRole === "admin"
				? <Inputs type={0}/>
				: null
				}
			<List  type={0} ElementComp={Ressource}/>
        </section>
    );
}

export default RessourcesPage;