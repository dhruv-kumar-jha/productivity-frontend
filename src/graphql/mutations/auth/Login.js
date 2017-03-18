'use strict';

import gql from 'graphql-tag';

export default gql`
	mutation Login( $email: String!, $password: String! ) {
	  login( email: $email, password: $password ) {
	  	token
	  }
	}
`;

