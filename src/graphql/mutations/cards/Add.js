'use strict';

import gql from 'graphql-tag';

export default gql`
	mutation AddCard( $_list: ID!, $title: String!, $description: String ) {
	  addCard( _list: $_list, title: $title, description: $description ) {
	  	id
	  	title
	  	description
	  	_list
	  	meta
	  	todos
	  }
	}
`;

