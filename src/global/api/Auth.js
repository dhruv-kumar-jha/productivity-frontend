'use strict';

import Helper from 'app/global/helper';


const Auth = {

	setAuthToken: (token) => {
		if ( token ) {
			Auth.setAccessToken(token);
		}
	},

	token: () => {
		return localStorage.token;
	},


	loggedIn: () => {
		return !! localStorage.token
	},

	setAccessToken: (token) => {
		localStorage.token = token;
	},

	getAccessToken: (token) => {
		return localStorage.token;
	},

	deleteAccessToken: () => {
		delete localStorage.token
	},

	logout: () => {
		delete localStorage.token;
		delete sessionStorage.redirect_after_login;
		Auth.setAuthToken();
	},


	// setAuthToken: (token) => {
	// 	if ( token ) {
	// 		axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
	// 		axios.defaults.transformResponse.push( Helper.axios.checkIfLoggedOut );
	// 	} else {
	// 		delete axios.defaults.headers.common['Authorization'];
	// 	}
	// },


}


export default Auth;

