'use strict';

import gql from 'graphql-tag';


export default {
	board: gql`
	fragment SingleBoardFields on Board {
		meta
		positions
		lists {
			id
			title
			description
			positions
			meta
			cards {
				id
				title
				description
				_list
				meta
				todos
			}
			created_at
			updated_at
		}
	}
`,

};
