'use strict';

import gql from 'graphql-tag';

export default gql`
	query PublicBoard($id: ID!) {
		publicBoard(id: $id) {
			id
			title
			description
			meta
			positions
			lists {
				id
				title
				description
				positions
				meta
				cards {
					id
					title
					description
					_list
					meta
					todos
				}
				created_at
				updated_at
			}
			status
			created_at
			updated_at
		}
	}
`;

