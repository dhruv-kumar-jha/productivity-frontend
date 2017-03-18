'use strict';

import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import { Icon, Spin, message, Modal, Dropdown, Menu } from 'antd';

import Card from 'app/components/productivity/cards/Show';
import NewCard from 'app/components/productivity/cards/New';
import Sortable from 'react-sortablejs';

import { graphql } from 'react-apollo';
import updateCardListMutation from 'app/graphql/mutations/cards/UpdateCardList';
import FetchBoardQuery from 'app/graphql/queries/boards/Single';
import GetAllBoardsQuery from 'app/graphql/queries/boards/All';

import updateCardPositionsMutation from 'app/graphql/mutations/lists/UpdateCardPositions';
import deleteListMutation from 'app/graphql/mutations/lists/Delete';


import _ from 'lodash';
import update from 'immutability-helper';


class List extends Component {

	constructor(props) {
		super(props);
		this.state = {
			processing: false,
		};
		this.updateCardList = this.updateCardList.bind(this);
		this.updateCardPositions = this.updateCardPositions.bind(this);
		this.listActions = this.listActions.bind(this);
		this.deleteList = this.deleteList.bind(this);

		this.gotoListEdit = this.gotoListEdit.bind(this);
	}


	updateCardList(id, from_list, to_list, order) {
		this.props.mutate({
			variables: {
				id: id,
				_list: to_list,
				// _list_positions: order,
			},
			refetchQueries: [ { query: FetchBoardQuery, variables: { id: this.props.board.id } }],
		})
		.then( res => {
			// message.success('Card list has been successfully updated.');
		})
		.catch( res => {
			if ( res.graphQLErrors ) {
				const errors = res.graphQLErrors.map( error => error.message );
			}
		});
	}



	updateCardPositions(order) {
		const loading_message = message.loading('Updating card position..', 0);
		this.props.updateCardPositions({
			variables: {
				id: this.props.data.id,
				positions: order,
			},
			optimisticResponse: {
				__typename: 'Mutation',
				updateCardPositions: {
					__typename: 'List',
					id: this.props.data.id,
					positions: order,
				},
			},
			updateQueries: {
				BoardQuery: (previousResult, { mutationResult }) => {
					const index = _.findIndex( previousResult.board.lists, { id: this.props.data.id } );
					const updated = mutationResult.data.updateCardPositions;
					return update(previousResult, {
						board: { lists: { [index]: { positions: { $set: updated.positions } } } },
					});
				}
			},

		})
		.then( res => {
			loading_message();
			message.success('Card position has been successfully updated.');
		})
		.catch( res => {
			if ( res.graphQLErrors ) {
				const errors = res.graphQLErrors.map( error => error.message );
			}
		});
	}



	deleteList(list_id) {
		this.setState({ processing: true });
		const loading_message = message.loading('Deleting list, please wait..', 0);

		this.props.deleteList({ variables: { id: list_id } })
			.then( () => {
				this.props.refetch()
					.then( res => {
						loading_message()
						message.success('List has been successfully deleted.');
					});
			});

	}



	gotoListEdit(list_id) {
		browserHistory.push(`/boards/${this.props.board.id}/lists/${list_id}`);
	}





	listActions(list_id) {

		const confirmListDeletion = (id) => {
			const _this = this;
			Modal.confirm({
				title: 'Are you sure?',
				content: 'This is a non reversible process, Once deleted you cannot recover this list again.',
				okText: 'Yes',
				cancelText: 'No',
				onOk() {
					_this.deleteList(id);
				},
				onCancel() {},
			});
		}

		return (
			<Menu>
			<Menu.Item>
			<div className="list__dropdown__actions">
				<div className="title">List Actions</div>
				<div className="links">
					<a onClick={ () => { this.gotoListEdit(list_id) } }>Update List</a>
					<span className="link-separator"></span>
					<a onClick={ () => { confirmListDeletion(list_id) } }>Delete this List</a>
				</div>
			</div>
			</Menu.Item>
			</Menu>
		);


	}







	render() {


		const { data, board } = this.props;


		const sortableOnChange = (order, sortable, evt) => {
			this.updateCardPositions(order);
		}


		const sortableCardOptions = {
			group: {
				name: 'cards',
				pull: true,
				put: true,
			},
			sort: true,
			filter: '.ignore',
			dataIdAttr: 'data-card-id',
			ghostClass: 'card-sortable-ghost',
			dragClass: 'card-sortable-drag',
			onAdd: (evt) => {
				const card_id = evt.item.getAttribute('data-card-id');
				const to_list = evt.to.offsetParent.getAttribute('data-list-id');
				const from_list = evt.from.offsetParent.getAttribute('data-list-id');
				const order = this.sortable.toArray();
				this.updateCardList( card_id, from_list, to_list, order );
			},
		};



		return (
			<div data-list-id={ data.id } className={ data.id === 'loading' || this.state.processing ? 'list autoheight' : 'list' }>
			<Spin spinning={ data.id === 'loading' || this.state.processing } size="large">
			<div className="content" data-list-id={ data.id }>

				<header>
					<div className="title">{ data.title }</div>
					<div className="ignore">
						<Dropdown overlay={ this.listActions(data.id) } trigger={['click']}>
							<Link><Icon type="ellipsis" /></Link>
						</Dropdown>
					</div>
				</header>


				{ data.cards &&
				<Sortable
					options={ sortableCardOptions }
					ref={(c) => { if (c) { this.sortable = c.sortable; } }}
					onChange={ sortableOnChange }
					className="cards-list"
				>
					{ data.cards && data.cards.map( card => <Card key={ card.id } data={ card } board={ board } /> )}
				</Sortable>
				}


				<NewCard list={{ id: data.id }} board={board} />

			</div>
			</Spin>
			</div>
		);
	
	}

}


export default graphql(updateCardListMutation)(
	graphql(updateCardPositionsMutation, { name: 'updateCardPositions' })
	(
		graphql(deleteListMutation, { name: 'deleteList' })(List)
	)
);


/*
				{ data.cards && data.cards.length > 0 &&
 */
