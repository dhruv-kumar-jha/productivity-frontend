'use strict';

import gql from 'graphql-tag';

export default gql`
	mutation DeleteCard( $id: ID! ) {
	  deleteCard( id: $id ) {
	  	id
	  }
	}
`;

