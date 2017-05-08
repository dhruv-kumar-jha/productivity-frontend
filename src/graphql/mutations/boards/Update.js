'use strict';

import gql from 'graphql-tag';

export default gql`
	mutation UpdateBoardMutation( $id: ID!, $title: String, $description: String, $meta: Mixed, $group: ID ) {
	  updateBoard( id: $id, title: $title, description: $description, meta: $meta, group: $group ) {
	  	id
	  	title
	  	description
	  	meta
	  	group
	  	status
	  }
	}
`;

