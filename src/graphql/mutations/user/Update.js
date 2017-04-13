'use strict';

import gql from 'graphql-tag';

export default gql`
	mutation UpdateUser( $id: ID!, $name: String, $email: String, $password: String, $language: String ) {
	  updateUser( id: $id, name: $name, email: $email, password: $password, language: $language ) {
		id
		name
		email
		status
		language
	  }
	}
`;

