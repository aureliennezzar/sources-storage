import React from 'react';
import './Nav.css'
import { NavLink } from 'react-router-dom';
const Nav = () => {
	return (
		<nav>
			<NavLink to='/feed' activeClassName="navbar__link--active">Feed</NavLink>
			<NavLink to='/ressources' activeClassName="navbar__link--active">Ressources</NavLink>
		</nav>
	);
}

export default Nav;