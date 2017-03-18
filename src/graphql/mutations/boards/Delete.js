'use strict';

import gql from 'graphql-tag';

export default gql`
	mutation DeleteBoard( $id: ID! ) {
	  deleteBoard( id: $id ) {
	  	id
	  	status
	  }
	}
`;

