import React from 'react';
import './Nav.css'
import { Link } from 'react-router-dom';
const Nav = () => {
	return (
		<nav>
			<ul>
				<Link to='/feed'>Feed</Link>
				<Link to='/ressources'>Ressources</Link>
			</ul>
		</nav>
	);
}

export default Nav;