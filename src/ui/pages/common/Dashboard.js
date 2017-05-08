'use strict';

import React from 'react';
import { FormattedMessage } from 'react-intl';
import translate from 'app/global/helper/translate';

import { graphql } from 'react-apollo';
import GetAllBoardsQuery from 'app/graphql/queries/boards/All';

import Loading from 'app/components/common/Loading';
import Heading from 'app/components/common/Heading';
import CommonLayout from 'app/components/layout/Common';
import GroupShow from 'app/components/productivity/groups/Show';

import Board from 'app/components/productivity/boards/Show';
import NewBoard from 'app/components/productivity/boards/New';
import GetAllGroupsQuery from 'app/graphql/queries/groups/All';

import { Row, Col, BackTop } from 'antd';
import _ from 'lodash';


const Dashboard = (props) => {

	if ( props.boards.loading || props.groups.loading ) {
		return <Loading text={ translate('messages.board.loading') } />;
	}

	const { boards } = props.boards;
	const { groups } = props.groups;


	const defaultBoards = _.filter( boards, (board) => {

		// check if the board doesn't have any group
		if ( board.group === null ) { return true; }
		// check if the specified group doesn't exist / has been deleted.
		if ( ! _.some( groups, { id: board.group } ) ) {
			return true;
		}
		return false;

	});



	return (
		<CommonLayout>

			<Heading
				title="Default Boards"
				subtitle="These are all the boards that are not associated with any Groups." />

			<Row type="flex" className="component__productivity__board m-t-30">
				{ defaultBoards.map( board => <Board key={board.id} data={board} />  )}
				<NewBoard />
			</Row>


			<div className="component__board__groups">
				{ groups.map( group => <GroupShow key={ group.id } boards={ boards } group={ group } /> ) }
			</div>


			<BackTop />

		</CommonLayout>
	);

}


export default graphql(
	GetAllBoardsQuery,
	{
		props: ({ data }) => ({
			boards: data
		})
	}
)(
	graphql(GetAllGroupsQuery,{ name: 'groups' })(Dashboard)
);




/*

			{ groups.map( group => {
				let currentBoards = _.filter( boards, { group: group.id } );
				return (
					<div key={ group.id } className="m-t-30">

						<Heading
							title={ group.name }
							subtitle={ group.description } />

						{ currentBoards.length > 0 &&
						<Row type="flex" className="component__productivity__board m-t-30">
							{ currentBoards.map( board => <Board key={board.id} data={board} />  )}
						</Row>
						}

					</div>
				)
			} ) }

 */