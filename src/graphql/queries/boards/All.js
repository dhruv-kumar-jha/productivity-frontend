'use strict';

import gql from 'graphql-tag';

import Common from './fragments/Common';


export default gql`
	query AllBoards {
		boards {
			...CommonBoardFields
		}
	}
	${ Common.board }
`;

