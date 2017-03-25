'use strict';

import React from 'react';
import { render } from 'react-dom';
import { Router, Redirect, Route, Link, browserHistory, IndexRoute } from 'react-router';

import ApolloClient, { toIdValue } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';

import networkInterface from 'app/global/middleware/networkInterface';
import initialState from 'app/global/middleware/initialState';

import ApplicationRoutes from './routes';


const dataIdFromObject = o => o.id;
const client = new ApolloClient({
	networkInterface,
	initialState,
	customResolvers: {
		Query: {
			board: (_, args) => toIdValue(dataIdFromObject({ __typename: 'board', id: args['id'] })),
		},
	},
	dataIdFromObject,
});


import AppLayout from 'app/ui/layout/App';

render(
	(
	<ApolloProvider client={ client }>
	<AppLayout>
		<Router history={ browserHistory } routes={ ApplicationRoutes } />
	</AppLayout>
	</ApolloProvider>
	),
	document.getElementById('application__core')
);



/*
import Middleware from 'app/global/middleware';

import AppLayout from 'app/ui/layout/App';
import DefaultLayout from 'app/ui/layout/Default';
import AuthLayout from 'app/ui/layout/Auth';
import PublicLayout from 'app/ui/layout/Public';

import Dashboard from 'app/ui/pages/common/Dashboard';
import Invalid from 'app/ui/common/Invalid';
import PageNotFound from 'app/ui/common/PageNotFound';

import LoginPage from 'app/ui/pages/auth/Login';
import SignupPage from 'app/ui/pages/auth/Signup';
import LogoutPage from 'app/ui/pages/auth/Logout';

import ShowBoardPage from 'app/ui/pages/boards/Show';
import ShowCardPage from 'app/ui/pages/boards/card/Show';

import ShowBoardEditPage from 'app/ui/pages/boards/Edit';
import ShowListPage from 'app/ui/pages/boards/List';

import SettingPage from 'app/ui/pages/common/Setting';

import ShowPublicBoard from 'app/ui/public/boards/Show';
import ShowPublicCard from 'app/ui/public/boards/Card';


// Just for reference
render(
	(
	<ApolloProvider client={ client }>
	<AppLayout>
		<Router history={ browserHistory }>

			<Route path="auth" component={ AuthLayout }>
				<Route path="login" component={ LoginPage } onEnter={ Middleware.auth.notLoggedIn } />
				<Route path="signup" component={ SignupPage } />
				<Route path="logout" component={ LogoutPage } />
			</Route>

			<Route path="public" component={ PublicLayout }>
				<Route path="boards">
					<Route path=":id" component={ ShowPublicBoard }>
						<Route path="cards/:card_id" component={ ShowPublicCard } />
					</Route>
				</Route>
				<Route path="*" component={ PageNotFound } />
			</Route>


			<Route component={ DefaultLayout } onEnter={ Middleware.auth.authenticatedUsersOnly } >
				<Route path="/" component={ Dashboard } />
				<Route path="dashboard" component={ Dashboard } />
				<Route path="settings" component={ SettingPage } />

				<Route path="boards">
					<Route path=":id" component={ ShowBoardPage }>
						<Route path="edit" component={ ShowBoardEditPage } />
						<Route path="lists/:list_id" component={ ShowListPage } />
						<Route path="cards/:card_id" component={ ShowCardPage } />
					</Route>
				</Route>

				<Route path="invalid" component={ Invalid } />
				<Route path="*" component={ PageNotFound } />
			</Route>

		</Router>
	</AppLayout>
	</ApolloProvider>
	),
	document.getElementById('application__core')
);

*/

