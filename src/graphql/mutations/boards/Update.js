'use strict';

import gql from 'graphql-tag';

export default gql`
	mutation UpdateBoardMutation( $id: ID!, $title: String, $description: String, $meta: Mixed ) {
	  updateBoard( id: $id, title: $title, description: $description, meta: $meta ) {
	  	id
	  	title
	  	description
	  	meta
	  	status
	  }
	}
`;

