'use strict';

import gql from 'graphql-tag';

export default gql`
	mutation UpdateList( $id: ID!, $title: String, $description: String ) {
	  updateList( id: $id, title: $title, description: $description ) {
	  	id
	  	title
	  	description
	  	_board
	  }
	}
`;

