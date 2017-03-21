'use strict';

import React, { Component } from 'react';
import { browserHistory } from 'react-router';

import ProductivityLayout from 'app/components/layout/Productivity';
import Header from 'app/components/productivity/boards/Header';

import { message } from 'antd';
import _ from 'lodash';
import update from 'immutability-helper';
import Helper from 'app/global/helper';

import { graphql } from 'react-apollo';
import FetchBoardQuery from 'app/graphql/queries/boards/Single';
import updateListPositionsMutation from 'app/graphql/mutations/boards/UpdateListPositions';

import Loading from 'app/components/common/Loading';
import Sortable from 'react-sortablejs';

import List from 'app/components/productivity/lists/Show';
import NewList from 'app/components/productivity/lists/New';


class ShowBoard extends Component {

	constructor(props) {
		super(props);
		this.state = {
			// background: this.props.data.board && this.props.data.board.meta ? this.props.data.board.meta.background : '',
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
		//  no-repeat center center
	}
	removeBackground() {
		document.body.style.backgroundColor = null;
		document.body.style.backgroundImage = null;
	}

	componentWillReceiveProps(nextProps) {
		if ( nextProps.data.board.meta.background || nextProps.data.board.meta.background_image ) {
			this.setBackground(nextProps.data.board.meta.background, nextProps.data.board.meta.background_image);
		}
	}

	// componentDidMount() {
	// 	document.getElementById("main").classList.add('board_view');
	// }

	componentWillUnmount() {
		this.removeBackground();
		// document.getElementById("main").classList.remove('board_view');
		// document.body.classList.add(props.board.meta.style);
	}




	render() {


		if ( this.props.data.loading ) {
			return <Loading text="Loading board details..." />;
		}

		if ( ! this.props.data.board ) {
			setTimeout( () => {
				message.warning("Board not found or you don't have permissions to access it.");
				this.handleRedirect();
			}, 50);
			return <Loading text="Loading board details..." />;
		}

		const { board } = this.props.data

		const updateListOrder = (order) => {
			const loading_message = message.loading('Updating the position of the list..', 0);
			this.props.mutate({
				variables: {
					id: board.id,
					positions: order,
				},
				optimisticResponse: {
					__typename: 'Mutation',
					updateListPositions: {
						__typename: 'Board',
						id: board.id,
						positions: order,
					},
				},
				updateQueries: {
					AllBoards: (previousResult, { mutationResult }) => {
						const index = _.findIndex( previousResult.boards, { id: board.id } );
						const updated = mutationResult.data.updateListPositions;
						return update(previousResult, {
							boards: {
								[index]: {
									positions: {
										$set: updated.positions,
									},
								}
							},
						});
					},
					BoardQuery: (previousResult, { mutationResult }) => {
						const updated = mutationResult.data.updateListPositions;
						return update(previousResult, {
							board: { positions: { $set: updated.positions } },
						});
					}
				},
			})
			.then( res => {
				loading_message();
				message.success('List position has been successfully updated.');
			})
			.catch( res => {
				if ( res.graphQLErrors ) {
					const errors = res.graphQLErrors.map( error => error.message );
					console.log('errors',errors);
				}
			});
		};


		const sortableOnChange = (order, sortable, evt) => {
			return updateListOrder(order);
		}


		const sortableListOptions = {
			group: {
				name: 'lists',
				pull: true,
				put: true
			},
			sort: true,
			handle: 'header',
			filter: '.ignore',
			dataIdAttr: 'data-list-id',
			ghostClass: 'list-sortable-ghost',
			dragClass: 'list-sortable-drag',
			chosenClass: 'list-sortable-chosen',
			scrollSensitivity: 40,
		};



		// sort the lists as well as its cards based on their positions.
		const sorted_lists = Helper.utils.getSortedListsAndCards( board.lists, board.positions );


		return (
			<ProductivityLayout>

				<Header
					title={ board.title }
					description={ board.description }
					board={{ id: board.id, meta: board.meta }}
				/>

				<div className="component__custom_scrollbar">
				<div className="component__productivity__lists">
					<Sortable options={ sortableListOptions } onChange={ sortableOnChange }>
						{ sorted_lists.map( list => <List key={list.id} data={list} board={{ id: board.id }} refetch={ this.props.data.refetch } /> )}
					</Sortable>
					<NewList board={{ id: board.id }} />
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
	FetchBoardQuery,
	{
		options: (props) => {
			return { variables: {
				id: props.params.id
			} }
		}
	}
)( graphql(updateListPositionsMutation)(ShowBoard) );


