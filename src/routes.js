'use strict';

import Middleware from 'app/global/middleware';
import AuthLayout from 'app/ui/layout/Auth';
import DynamicImport from 'app/components/common/DynamicImport';



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
					getComponent(location, cb) {
						DynamicImport(
							import(/* webpackChunkName: "auth-login" */'app/ui/pages/auth/Login'),
							cb,
							'auth-login'
						);
					}
				},
				{
					path: 'signup',
					getComponent(location, cb) {
						DynamicImport(
							import(/* webpackChunkName: "auth-signup" */'app/ui/pages/auth/Signup'),
							cb,
							'auth-signup'
						);
					}
				},
				{
					path: 'logout',
					getComponent(location, cb) {
						DynamicImport(
							import(/* webpackChunkName: "auth-logout" */'app/ui/pages/auth/Logout'),
							cb,
							'auth-logout'
						);
					}
				},
			]
		},


		// publicly accessible routes
		{
			path: 'public',
			getComponent(location, cb) {
				DynamicImport(
					import(/* webpackChunkName: "layout-public" */'app/ui/layout/Public'),
					cb,
					'layout-public'
				);
			},
			childRoutes: [
				{
					path: 'boards',
					childRoutes: [
						{
							path: ':id',
							getComponent(location, cb) {
								DynamicImport(
									import(/* webpackChunkName: "public-board-show" */'app/ui/public/boards/Show'),
									cb,
									'public-board-show'
								);
							},
							childRoutes: [
								{
									path: 'cards/:card_id',
									getComponent(location, cb) {
										DynamicImport(
											import(/* webpackChunkName: "public-card-show" */'app/ui/public/boards/Card'),
											cb,
											'public-card-show'
										);
									}
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
			getComponent(location, cb) {
				DynamicImport(
					import(/* webpackChunkName: "layout-default" */'app/ui/layout/Default'),
					cb,
					'layout-default'
				);
			},
			indexRoute: {
				getComponent(location, cb) {
					DynamicImport(
						import(/* webpackChunkName: "dashboard" */'app/ui/pages/common/Dashboard'),
						cb,
						'dashboard'
					);
				}
			},
			childRoutes: [
				{
					path: 'dashboard',
					getComponent(location, cb) {
						DynamicImport(
							import(/* webpackChunkName: "dashboard" */'app/ui/pages/common/Dashboard'),
							cb,
							'dashboard'
						);
					}
				},
				{
					path: 'settings',
					getComponent(location, cb) {
						DynamicImport(
							import(/* webpackChunkName: "setting" */'app/ui/pages/common/settings'),
							cb,
							'setting'
						);
					},
					childRoutes: [
						{
							path: 'general',
							indexRoute: {
								getComponent(location, cb) {
									DynamicImport(
										import(/* webpackChunkName: "setting-general" */'app/ui/pages/common/settings/General'),
										cb,
										'setting-general'
									);
								}
							},
						},
						{
							path: 'groups',
							getComponent(location, cb) {
								DynamicImport(
									import(/* webpackChunkName: "setting-groups" */'app/ui/pages/common/settings/Groups'),
									cb,
									'setting-groups'
								);
							},
							childRoutes: [
								{
									path: 'create',
									getComponent(location, cb) {
										DynamicImport(
											import(/* webpackChunkName: "setting-groups-create" */'app/components/groups/Create'),
											cb,
											'setting-groups-create'
										);
									}
								},
								{
									path: ':id/edit',
									getComponent(location, cb) {
										DynamicImport(
											import(/* webpackChunkName: "setting-groups-update" */'app/components/groups/Edit'),
											cb,
											'setting-groups-update'
										);
									}
								},


							],
						},
					],
				},

				{
					path: 'boards',
					indexRoute: {
						getComponent(location, cb) {
							DynamicImport(
								import(/* webpackChunkName: "boards" */'app/ui/pages/common/Boards'),
								cb,
								'boards'
							);
						}
					},
					childRoutes: [
						{
							path: ':id',
							getComponent(location, cb) {
								DynamicImport(
									import(/* webpackChunkName: "board-show" */'app/ui/pages/boards/Show'),
									cb,
									'board-show'
								);
							},
							childRoutes: [
								{
									path: 'edit',
									getComponent(location, cb) {
										DynamicImport(
											import(/* webpackChunkName: "board-edit" */'app/ui/pages/boards/Edit'),
											cb,
											'board-edit'
										);
									}
								},
								{
									path: 'lists/:list_id',
									getComponent(location, cb) {
										DynamicImport(
											import(/* webpackChunkName: "list-show" */'app/ui/pages/boards/List'),
											cb,
											'list-show'
										);
									}
								},
								{
									path: 'cards/:card_id',
									getComponent(location, cb) {
										DynamicImport(
											import(/* webpackChunkName: "card-show" */'app/ui/pages/boards/card/Show'),
											cb,
											'card-show'
										);
									}
								},
							]
						},
					]
				},

				// invalid/404 routes
				{
					path: 'invalid',
					getComponent(location, cb) {
						DynamicImport(
							import(/* webpackChunkName: "invalid" */'app/ui/common/Invalid'),
							cb,
							'invalid'
						);
					}
				},
				{
					path: '*',
					getComponent(location, cb) {
						DynamicImport(
							import(/* webpackChunkName: "page-not-found" */'app/ui/common/PageNotFound'),
							cb,
							'page-not-found'
						);
					}
				},

			]

		},



	]
};


export default componentRoutes;
