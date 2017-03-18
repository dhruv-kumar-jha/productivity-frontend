'use strict';

import gql from 'graphql-tag';

export default gql`
	mutation UpdateUser( $id: ID!, $name: String, $email: String, $password: String ) {
	  updateUser( id: $id, name: $name, email: $email, password: $password ) {
		id
		name
		email
		status
	  }
	}
`;

