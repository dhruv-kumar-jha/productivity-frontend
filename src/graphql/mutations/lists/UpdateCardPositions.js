'use strict';

import gql from 'graphql-tag';

export default gql`
	mutation UpdateCardPositions( $id: ID!, $positions: [ID]! ) {
	  updateCardPositions( id: $id, positions: $positions ) {
	  	id
	  	positions
	  }
	}
`;

