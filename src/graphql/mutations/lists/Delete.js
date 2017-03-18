'use strict';

import gql from 'graphql-tag';

export default gql`
	mutation DeleteList( $id: ID! ) {
	  deleteList( id: $id ) {
	  	id
	  }
	}
`;

