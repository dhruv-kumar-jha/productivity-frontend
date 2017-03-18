'use strict';

import gql from 'graphql-tag';

export default gql`
	mutation AddTodo( $_card: ID!, $title: String!, $description: String ) {
	  addTodo( _card: $_card, title: $title, description: $description ) {
	  	_id
	  	title
	  	description
	  }
	}
`;

