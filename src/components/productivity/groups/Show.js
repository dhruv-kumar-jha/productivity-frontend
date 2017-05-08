'use strict';

import React from 'react';

import Heading from 'app/components/common/Heading';
import Board from 'app/components/productivity/boards/Show';

import { Row } from 'antd';
import _ from 'lodash';


const GroupShow = (props) => {

	const { group, boards } = props;
	const currentBoards = _.filter( boards, { group: group.id } );

	return (
		<div key={ group.id } className="item_group">

			<Heading
				title={ group.name }
				subtitle={ group.description } />

			{ currentBoards.length > 0 &&
				<Row type="flex" className="component__productivity__board m-t-30">
					{ currentBoards.map( board => <Board key={board.id} data={board} />  )}
				</Row>
			}
			{ currentBoards.length < 1 &&
				<div className="empty">
					<p>No boards have been added/associated with this group yet.</p>
					<p>As soon as you associate any Board with this Group, It will appear here.</p>

				</div>
			}


		</div>
	)

}

export default GroupShow;
