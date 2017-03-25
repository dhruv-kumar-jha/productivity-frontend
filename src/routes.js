'use strict';

import Middleware from 'app/global/middleware';
import AuthLayout from 'app/ui/layout/Auth';


function errorLoading(error) {
	throw new Error(`Component loading failed: ${error}`);
}

function loadRoute(cb) {
	return module => cb( null, module.default );
}


const componentRoutes = {
	childRoutes: [

		// auth specific routes
		{
			path: 'auth',
			component: AuthLayout,
			childRoutes: [
				{
					path: 'login',
					oEnter: Middleware.auth.notLoggedIn,
					getComponent(location, cb) { import('app/ui/pages/auth/Login').then(loadRoute(cb)).catch(errorLoading); }
				},
				{
					path: 'signup',
					getComponent(location, cb) { import('app/ui/pages/auth/Signup').then(loadRoute(cb)).catch(errorLoading); }
				},
				{
					path: 'logout',
					getComponent(location, cb) { import('app/ui/pages/auth/Logout').then(loadRoute(cb)).catch(errorLoading); }
				},
			]
		},


		// publicly accessible routes
		{
			path: 'public',
			getComponent(location, cb) { import('app/ui/layout/Public').then(loadRoute(cb)).catch(errorLoading); },
			childRoutes: [
				{
					path: 'boards',
					childRoutes: [
						{
							path: ':id',
							getComponent(location, cb) { import('app/ui/public/boards/Show').then(loadRoute(cb)).catch(errorLoading); },
							childRoutes: [
								{
									path: 'cards/:card_id',
									getComponent(location, cb) { import('app/ui/public/boards/Card').then(loadRoute(cb)).catch(errorLoading); }
								},
							]
						},
					]
				},
			]
		},


		// logged in user specific routes
		{
			path: '/',
			onEnter: Middleware.auth.authenticatedUsersOnly,
			getComponent(location, cb) { import('app/ui/layout/Default').then(loadRoute(cb)).catch(errorLoading); },
			indexRoute: {
				getComponent(location, cb) { import('app/ui/pages/common/Dashboard').then(loadRoute(cb)).catch(errorLoading); }
			},
			childRoutes: [
				{
					path: 'dashboard',
					getComponent(location, cb) { import('app/ui/pages/common/Dashboard').then(loadRoute(cb)).catch(errorLoading); }
				},
				{
					path: 'settings',
					getComponent(location, cb) { import('app/ui/pages/common/Setting').then(loadRoute(cb)).catch(errorLoading); }
				},

				{
					path: 'boards',
					childRoutes: [
						{
							path: ':id',
							getComponent(location, cb) { import('app/ui/pages/boards/Show').then(loadRoute(cb)).catch(errorLoading); },
							childRoutes: [
								{
									path: 'edit',
									getComponent(location, cb) { import('app/ui/pages/boards/Edit').then(loadRoute(cb)).catch(errorLoading); }
								},
								{
									path: 'lists/:list_id',
									getComponent(location, cb) { import('app/ui/pages/boards/List').then(loadRoute(cb)).catch(errorLoading); }
								},
								{
									path: 'cards/:card_id',
									getComponent(location, cb) { import('app/ui/pages/boards/card/Show').then(loadRoute(cb)).catch(errorLoading); }
								},
							]
						},
					]
				},

				// invalid/404 routes
				{
					path: 'invalid',
					getComponent(location, cb) { import('app/ui/common/Invalid').then(loadRoute(cb)).catch(errorLoading); }
				},
				{
					path: '*',
					getComponent(location, cb) { import('app/ui/common/PageNotFound').then(loadRoute(cb)).catch(errorLoading); }
				},

			]

		},






	]
};



export default componentRoutes;
