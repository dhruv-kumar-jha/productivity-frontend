'use strict';

import gql from 'graphql-tag';

export default gql`
	mutation AddGroup( $name: String!, $description: String ) {
	  addGroup( name: $name, description: $description ) {
		id
		name
		description
		status
	  }
	}
`;

