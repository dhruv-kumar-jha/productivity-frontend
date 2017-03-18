'use strict';

import gql from 'graphql-tag';

export default gql`
	mutation Signup( $name: String!, $email: String!, $password: String! ) {
	  signup( name: $name, email: $email, password: $password ) {
	  	id
	  	name
	  	email
	  }
	}
`;

