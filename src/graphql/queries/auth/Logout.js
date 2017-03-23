'use strict';

import gql from 'graphql-tag';

export default gql`
	query Logout {
		logout {
			id
		}
	}
`;

