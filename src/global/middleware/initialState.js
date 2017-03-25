'use strict';

import jwt_decode from 'jwt-decode';
import Auth from 'app/global/api/Auth';

const token = Auth.token();
let decoded_user = null;

if ( token ) {
	try {
		decoded_user = jwt_decode( Auth.token() );
	} catch (e) {
	}
}

const initialState = {

	apollo: {
		data: {
			current_user: decoded_user,
		}
	}

}


export default initialState;
