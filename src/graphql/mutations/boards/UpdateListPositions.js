'use strict';

import gql from 'graphql-tag';

export default gql`
	mutation UpdateListPositions( $id: ID!, $positions: [ID]! ) {
	  updateListPositions( id: $id, positions: $positions ) {
	  	id
	  	positions
	  }
	}
`;

