'use strict';

import gql from 'graphql-tag';

export default gql`
	mutation UpdateCard( $id: ID!, $title: String, $description: String, $meta: Mixed ) {
	  updateCard( id: $id, title: $title, description: $description, meta: $meta ) {
	  	id
	  	title
	  	description
	  	_list
	  	meta
	  	todos
	  }
	}
`;

