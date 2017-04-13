'use strict';

import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';

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

