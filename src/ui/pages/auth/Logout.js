'use strict';

import React from 'react';
// import { browserHistory } from 'react-router';

import Auth from 'app/global/api/Auth';
import { message } from 'antd';

import CommonLayout from 'app/components/layout/Common';
import Heading from 'app/components/common/Heading';
import Loading from 'app/components/common/Loading';

import { graphql } from 'react-apollo';
import LogoutQuery from 'app/graphql/queries/auth/Logout';


const Logout = (props) => {

	setTimeout( () => {
		Auth.logout();
		message.success('You have been successfully logged out.', 4);
		// browserHistory.push('/auth/login');
		// props.client.resetStore();

		// doing hard refresh since apollo module re-fetches the data after logout...
		// will remove this once they provide option for not re-fetching the data and resetting the entire store.
		window.location.href = '/auth/login';
	}, 20);

	return (
		<CommonLayout>

			<Heading
				title="Logging you out"
				subtitle="Please wait while we log you out., you will be automatically redirected to the login page after successful logout."
				icon="logout"
				align="center"
			>
				<div className="m-t-20">
					<Loading type="inline" hideText={true} />
				</div>
			</Heading>



		</CommonLayout>
	);

}

export default graphql(LogoutQuery)(Logout);
