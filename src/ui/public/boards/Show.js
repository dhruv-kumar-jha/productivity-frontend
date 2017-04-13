'use strict';

import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import translate from 'app/global/helper/translate';

import ProductivityLayout from 'app/components/layout/Productivity';
import Header from 'app/components/productivity/boards/Header';

import CommonLayout from 'app/components/layout/Common';
import Heading from 'app/components/common/Heading';

import { message } from 'antd';
import Helper from 'app/global/helper';

import { graphql } from 'react-apollo';
import FetchPublicBoardQuery from 'app/graphql/queries/public/Board';

import Loading from 'app/components/common/Loading';
import List from 'app/components/public/boards/List';


class PublicShowBoard extends Component {

	constructor(props) {
		super(props);
		this.state = {
		};
		this.handleRedirect = this.handleRedirect.bind(this);
		this.setParentState = this.setParentState.bind(this);
	}

	handleRedirect() {
		browserHistory.push(`/dashboard`);
	}

	setParentState( newstate ) {
		this.setState(newstate);
		if ( newstate.background || newstate.background_image ) { this.setBackground(newstate.background, newstate.background_image); }
		else { this.removeBackground() }
	}

	setBackground(backgroundColor,backgroundImage) {
		if ( backgroundColor ) { document.body.style.backgroundColor = backgroundColor; }
		if ( backgroundImage ) { document.body.style.backgroundImage = `url('${backgroundImage}')`; }
		document.body.classList.add('transparent-header');
	}
	removeBackground() {
		document.body.style.backgroundColor = null;
		document.body.style.backgroundImage = null;
		document.body.classList.remove('transparent-header');
	}

	componentWillReceiveProps(nextProps) {
		const meta = nextProps.data.publicBoard && nextProps.data.publicBoard.meta || {}
		if ( meta.background || meta.background_image ) {
			this.setBackground(meta.background, meta.background_image);
		}
	}

	componentWillUnmount() {
		this.removeBackground();
	}



	render() {

		if ( this.props.data.loading ) {
			return <Loading text={ translate('messages.board.show.loading') } />;
		}

		if ( ! this.props.data.publicBoard ) {
			return (
				<CommonLayout>
					<Heading
						title="Public Board Not Found"
						subtitle="Either the board you're looking for doesn't exist or you dont have permissions to access it."
						icon="exclamation-circle"
						align="center"
					/>
				</CommonLayout>
			);
		}


		const board = this.props.data.publicBoard;

		// sort the lists as well as its cards based on their positions.
		const sorted_lists = Helper.utils.getSortedListsAndCards( board.lists, board.positions );

		return (
			<ProductivityLayout>

				<Header
					title={ board.title }
					description={ board.description }
					board={{ id: board.id, meta: board.meta }}
					public={ true }
				/>

				<div className="component__custom_scrollbar">
				<div className="component__productivity__lists">
					{ sorted_lists.map( list => <List key={list.id} data={list} board={{ id: board.id }} /> )}
				</div>
				</div>

				{ this.props.children &&
					<div>{ React.cloneElement( this.props.children, { data: this.props.data, setParentState: this.setParentState } ) }</div>
				}

			</ProductivityLayout>
		);

	}


}

export default graphql(
	FetchPublicBoardQuery,
	{
		options: (props) => {
			return { variables: {
				id: props.params.id
			} }
		}
	}
)(PublicShowBoard);


