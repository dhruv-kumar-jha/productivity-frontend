'use strict';

import gql from 'graphql-tag';

import Common from './fragments/Common';
import Single from './fragments/Single';


export default gql`
	query BoardQuery($id: ID!) {
		board(id: $id) {
			...CommonBoardFields
			...SingleBoardFields
		}
	}
	${ Common.board }
	${ Single.board }
`;

