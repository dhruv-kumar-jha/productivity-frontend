'use strict';

import gql from 'graphql-tag';


export default {
	board: gql`
	fragment CommonBoardFields on Board {
		id
		title
		description
		status
		group
		created_at
		updated_at
	}
`,

};
