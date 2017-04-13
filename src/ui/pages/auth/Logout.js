'use strict';

import React from 'react';
import { FormattedMessage } from 'react-intl';
import translate from 'app/global/helper/translate';

import Auth from 'app/global/api/Auth';
import { message } from 'antd';

import CommonLayout from 'app/components/layout/Common';
import Heading from 'app/components/common/Heading';
import Loading from 'app/components/common/Loading';

import { graphql } from 'react-apollo';
import LogoutQuery from 'app/graphql/queries/auth/Logout';


const Logout = (props) => {

	// if ( ! props.data.loading && props.data.logout.status ) {
	if ( ! props.data.loading && props.data.networkStatus === 7 ) {
		Auth.logout();
		setTimeout( () => {
			message.success( translate('messages.logout.success') );
		}, 10);
		setTimeout( () => {
			window.location.href = '/auth/login';
		}, 100);
	}


	return (
		<CommonLayout>

			<Heading
				title={<FormattedMessage id="logout.title" defaultMessage="Logging you out" />}
				subtitle={<FormattedMessage id="logout.subtitle" defaultMessage="Please wait while we log you out., you will be automatically redirected to the login page after successful logout." />}
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
