'use strict';

import gql from 'graphql-tag';

export default gql`
	mutation DeleteGroup( $id: ID! ) {
	  deleteGroup( id: $id ) {
	  	id
	  }
	}
`;

