'use strict';

import gql from 'graphql-tag';

export default gql`
	query AllGroups {
		groups {
			id
			name
			description
			status
		}
	}
`;

