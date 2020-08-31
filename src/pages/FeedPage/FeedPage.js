import React, { useContext } from 'react';
import './FeedPage.css'
import Inputs from '../../components/Inputs/Inputs';
import List from '../../components/List/List';
import Article from '../../components/Article/Article';
import { UserContext } from '../../contexts/UserContext';

const FeedPage = () => {
	const userRole = useContext(UserContext)
	return (
		<section className="feedPage">
			{userRole === "admin"
				? <Inputs type={1} />
				: null
				}

			<List type={1} ElementComp={Article} />
		</section>
	);
}

export default FeedPage;