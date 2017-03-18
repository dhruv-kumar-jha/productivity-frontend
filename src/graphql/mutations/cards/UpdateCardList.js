'use strict';

import gql from 'graphql-tag';

export default gql`
	mutation UpdateCardList( $id: ID!, $_list: ID!, $_list_positions: [ID] ) {
	  updateCardList( id: $id, _list: $_list, _list_positions: $_list_positions ) {
	  	id
	  	_list
	  	title
	  	description
	  }
	}
`;

