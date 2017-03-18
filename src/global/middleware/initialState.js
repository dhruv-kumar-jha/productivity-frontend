'use strict';

import jwt_decode from 'jwt-decode';
import Auth from 'app/global/api/Auth';

const token = Auth.token();
let decoded_user = null;

if ( token ) {
	decoded_user = jwt_decode( Auth.token() );
}

const initialState = {

	apollo: {
		data: {
			current_user: decoded_user,
		}
	}

}


export default initialState;
