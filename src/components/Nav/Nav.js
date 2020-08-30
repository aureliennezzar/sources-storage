import React from 'react';
import './Nav.css'
import { NavLink } from 'react-router-dom';
const Nav = () => {
	return (
		<nav>
			<div className="navWrap">
				<NavLink to='/feed' activeClassName="navbar__link--active">Feed</NavLink>
				<NavLink to='/ressources' activeClassName="navbar__link--active">Ressources</NavLink>
			</div>
		</nav>
	);
}

export default Nav;