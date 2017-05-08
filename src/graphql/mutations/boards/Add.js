'use strict';

import gql from 'graphql-tag';

export default gql`
	mutation AddBoard( $title: String!, $description: String, $group: ID ) {
	  addBoard( title: $title, description: $description, group: $group ) {
	  	id
	  	title
	  	description
	  	positions
		meta
		group
		lists {
			id
			title
			description
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

