'use strict';

import Auth from 'app/global/api/Auth';

export default {

	auth: {

		authenticatedUsersOnly( nextState, replace ) {
			if( nextState.location.pathname != '/dashboard' ) {
				// if ( sessionStorage.redirect_after_login ) { localStorage.removeItem('redirect_after_login'); }
				sessionStorage.setItem( 'redirect_after_login', nextState.location.pathname);
			}
			if ( ! Auth.loggedIn() ) {
				replace({
					pathname: '/auth/login',
					state: { nextPathname: nextState.location.pathname }
				});
			}
		},


		notLoggedIn( nextState, replace ) {
			if ( Auth.loggedIn() ) {
				replace({
					pathname: '/dashboard',
					state: { nextPathname: nextState.location.pathname }
				});
			}
		},

		logoutUser( nextState, replace ) {
			Auth.logout();
			replace({
				pathname: '/dashboard',
				state: { nextPathname: nextState.location.pathname }
			});

		},


	}



};

