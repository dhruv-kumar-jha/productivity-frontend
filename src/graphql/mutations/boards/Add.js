'use strict';

import gql from 'graphql-tag';

export default gql`
	mutation AddBoard( $title: String!, $description: String ) {
	  addBoard( title: $title, description: $description ) {
	  	id
	  	title
	  	description
	  	positions
		meta
		lists {
			id
			title
			description
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

