import React, { useContext } from 'react'
import {
	BrowserRouter as Router,
	Switch,
  } from "react-router-dom";

  import { AuthContext } from '../auth/AuthContext';
  import { PrivateRouter } from './PrivateRouter';
  import { PublicRouter } from './PublicRouter';

import { LoginScreen } from '../components/login/LoginScreen';
import { DashboardRoutes } from './DashboardRoutes';

export const AppRouter = () => {

	const { user } = useContext(AuthContext);
	return (
		<Router>
			<div>
				<Switch>
					<PublicRouter exact path="/login" component={ LoginScreen } isAuthenticated = { user.logged }/>
					<PrivateRouter path="/" component={ DashboardRoutes } isAuthenticated = { user.logged }/>
				</Switch>
			</div>
	  </Router>
	)
}