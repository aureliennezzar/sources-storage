import React, { useEffect, useState } from 'react';
import './App.css';
import { auth, db } from './services/firebase'
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
import Login from './components/Login/Login';
import { UserContext } from './contexts/UserContext';

function App() {
	const [userRole, setUserRole] = useState('user')
	useEffect(() => {
		console.log("App created in 2020 by Aurélien Tallet & Aurélien Nezzar")
		auth().onAuthStateChanged(function (user) {
			if (user) {
				db.collection("users").doc(user.uid).get().then((doc) => {
					if (doc.exists) {
						setUserRole("admin")
					}
				})
			}
		});
	}, []);

	return (
		<>
			<div className="App">
				<header>
					<h1>Welcome to Sources Storage</h1>
				</header>
				<Login />
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
					<UserContext.Provider value={userRole}>
						<Route exact path="/feed" component={FeedPage} />
						<Route exact path="/ressources" component={RessourcesPage} />
					</UserContext.Provider>
					<Route exact path="*" component={PageNotFound} />
				</Switch>
			</Router>
		</>

	);
}

export default App;
