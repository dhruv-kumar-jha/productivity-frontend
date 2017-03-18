'use strict';

import gql from 'graphql-tag';

export default gql`
	mutation UpdateTodo( $_card: ID!, $_id: ID!, $title: String, $description: String, $completed: Boolean ) {
	  updateTodo( _card: $_card, _id: $_id, title: $title, description: $description, completed: $completed ) {
	  	_card
	  	_id
	  	title
	  	description
	  	completed
	  }
	}
`;

