import React, { useEffect } from 'react';
import './App.css';
import {
	BrowserRouter as Router,
	Switch,
	Redirect,
	Route
} from "react-router-dom";
import RessourcesPage from './pages/RessourcesPage/RessourcesPage';
import FeedPage from './pages/FeedPage/FeedPage';
import PageNotFound from './PageNotFound';
import Nav from './components/Nav/Nav';

function App() {
	useEffect(() => {
		console.log("App created in 2020 by Aurélien Tallet & Aurélien Nezzar")
	}, []);
	return (
		<>
			<div className="App">

				<header>
					<h1>Welcome to Sources Storage</h1>
				</header>
			</div>
			<Router>
				<Nav />
				<Switch>
					<Route
						exact
						path="/"
						render={() => {
							return (
								<Redirect to="/feed" />
							)
						}}
					/>
					
					<Route exact path="/feed" render={() => <FeedPage />} />
					<Route exact path="/ressources" render={() => <RessourcesPage />} />
					<Route exact path="*" render={() => <PageNotFound />} />
				</Switch>
			</Router>
		</>

	);
}

export default App;
