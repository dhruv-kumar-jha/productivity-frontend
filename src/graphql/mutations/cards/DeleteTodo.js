'use strict';

import gql from 'graphql-tag';

export default gql`
	mutation DeleteTodo( $_card: ID!, $_id: ID! ) {
	  deleteTodo( _card: $_card, _id: $_id ) {
	  	_id
	  }
	}
`;

