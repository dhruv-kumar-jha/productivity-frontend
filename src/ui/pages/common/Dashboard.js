'use strict';

import React from 'react';

import { graphql } from 'react-apollo';
// import GetCurrentUserQuery from 'app/graphql/queries/auth/CurrentUser';
import GetAllBoardsQuery from 'app/graphql/queries/boards/All';

import Loading from 'app/components/common/Loading';
import Heading from 'app/components/common/Heading';
import CommonLayout from 'app/components/layout/Common';

import Board from 'app/components/productivity/boards/Show';
import NewBoard from 'app/components/productivity/boards/New';

import { Row, Col } from 'antd';


const Dashboard = (props) => {

	if ( props.boards.loading ) {
		return <Loading text="Loading boards..." />;
	}

	const { boards } = props.boards;


	return (
		<CommonLayout>

			<Heading
				title="All of your Boards"
				subtitle="These are all the boards you have added till date, Any board you add will appear here." />


			<Row type="flex" className="component__productivity__board m-t-30">
				{ boards.map( board => <Board key={board.id} data={board} />  )}
				<NewBoard />
			</Row>

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
)(Dashboard);

