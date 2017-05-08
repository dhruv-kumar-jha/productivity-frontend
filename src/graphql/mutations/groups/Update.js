'use strict';

import gql from 'graphql-tag';

export default gql`
	mutation UpdateGroup( $id: ID!, $name: String, $description: String, $meta: Mixed ) {
	  updateGroup( id: $id, name: $name, description: $description, meta: $meta ) {
		id
		name
		description
		status
	  }
	}
`;

