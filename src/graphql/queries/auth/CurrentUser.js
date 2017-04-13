'use strict';

import gql from 'graphql-tag';

export default gql`
	query CurrentUser {
		current_user {
			id
			name
			email
			status
			language
		}
	}
`;

