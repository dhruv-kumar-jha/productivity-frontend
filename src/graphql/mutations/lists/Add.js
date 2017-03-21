'use strict';

import gql from 'graphql-tag';

export default gql`
	mutation AddList( $_board: ID!, $title: String!, $description: String ) {
	  addList( _board: $_board, title: $title, description: $description ) {
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
	}
`;

