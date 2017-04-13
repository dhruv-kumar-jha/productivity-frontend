'use strict';

import { createNetworkInterface } from 'apollo-client';
import config from 'app/global/config';
import Auth from 'app/global/api/Auth';
import translate from 'app/global/helper/translate';

import { browserHistory } from 'react-router';
import { message } from 'antd';


const errorHandler = {
	applyAfterware({response}, next) {
		response.clone().json()
			.then( res => {
				// console.log('applyAfterware res',res);
				// else if ( res.data.publicBoard == null ) {
				// 	next();
				// }

				if ( res.code === 401 || res.code === 403 ) {
					// unauthorized, logout and redirect to login page
					if ( window.location.pathname != '/auth/logout' ) {
						message.info( translate('global.token.expired') );
						browserHistory.push('/auth/logout');
					}
				}
				else if ( res.errors && res.errors.length > 0 ) {
					if ( res.errors[0].path === '_id' ) {
						message.warning( translate('global.record.empty') );
						browserHistory.push('/dashboard');
					}
					else { next(); }
				}
				else {
					next();
				}
			});

	}
};




const networkInterface = createNetworkInterface({
	uri: window.__API__ENDPOINT__ || config.api.endpoint,
});

networkInterface.use([{
	applyMiddleware(req, next) {
		if ( ! req.options.headers) { req.options.headers = {}; }
		const token = Auth.getAccessToken();
		req.options.headers.authorization = token ? `Bearer ${token}` : null;
		next();
	}
}]);

networkInterface.useAfter([ errorHandler ]);

export default networkInterface;
