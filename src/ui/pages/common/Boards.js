'use strict';

import React from 'react';
import { FormattedMessage } from 'react-intl';
import translate from 'app/global/helper/translate';

import { graphql } from 'react-apollo';
import GetAllBoardsQuery from 'app/graphql/queries/boards/All';

import Loading from 'app/components/common/Loading';
import Heading from 'app/components/common/Heading';
import CommonLayout from 'app/components/layout/Common';

import Board from 'app/components/productivity/boards/Show';
import NewBoard from 'app/components/productivity/boards/New';

import { Row, Col } from 'antd';


const Boards = (props) => {

	if ( props.boards.loading ) {
		return <Loading text={ translate('messages.board.loading') } />;
	}

	const { boards } = props.boards;

	return (
		<CommonLayout>

			<Heading
				title={<FormattedMessage id="dashboard.title" defaultMessage="All of your Boards" />}
				subtitle={<FormattedMessage id="dashboard.subtitle" defaultMessage="These are all the boards you have added till date, Any board you add will appear here." />} />

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
)(Boards);

