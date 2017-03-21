'use strict';

import gql from 'graphql-tag';

export default gql`
	mutation UpdateList( $id: ID!, $title: String, $description: String, $meta: Mixed ) {
	  updateList( id: $id, title: $title, description: $description, meta: $meta ) {
	  	id
	  	title
	  	description
	  	meta
	  	_board
	  }
	}
`;

