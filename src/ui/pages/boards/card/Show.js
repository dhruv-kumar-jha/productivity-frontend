'use strict';

import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import { FormattedMessage } from 'react-intl';
import translate from 'app/global/helper/translate';

import { graphql } from 'react-apollo';
import updateCardMutation from 'app/graphql/mutations/cards/Update';
import deleteCardMutation from 'app/graphql/mutations/cards/Delete';
import FetchBoardQuery from 'app/graphql/queries/boards/Single';

import { Modal, Spin, Icon, message, Button } from 'antd';

import _  from 'lodash';
import update from 'immutability-helper';

import ModalHeader from 'app/components/productivity/modal/Header';
import CardTabGeneral from 'app/components/productivity/modal/General';
import CardTabTodoList from 'app/components/productivity/modal/Todo';
import CardTabMeta from 'app/components/productivity/modal/Meta';



class ShowCard extends Component {

	constructor(props) {
		super(props);
		this.state = {
			processing: false,
			delete_card: false,
			tab: 'default',
		};

		this.mutate = this.mutate.bind(this);
		this.handleCancel = this.handleCancel.bind(this);

		this.confirmDeletion = this.confirmDeletion.bind(this);

		this.deleteCard = this.deleteCard.bind(this);

		this.setActiveTab = this.setActiveTab.bind(this);
	}



	handleCancel() {
		browserHistory.push(`/boards/${this.props.params.id}`);
	}


	deleteCard( card ) {
		// this.setState({ processing: true, delete_card: true });
		const loading_message = message.loading( translate('messages.card.delete.loading'), 0);
		// browserHistory.push(`/boards/${this.props.params.id}`);

		this.props.deleteCard({
			variables: {
				id: card.id,
			},
			optimisticResponse: {
				__typename: 'Mutation',
				deleteCard: {
					__typename: 'Card',
					id: 'loading',
					deleting: true,
				},
			},
			updateQueries: {
				BoardQuery: (previousResult, { mutationResult }) => {
					const listIndex = _.findIndex( previousResult.board.lists, { id: card._list } );
					const cardIndex = _.findIndex( previousResult.board.lists[listIndex].cards, { id: card.id } );

					const deleteCard = mutationResult.data.deleteCard;
					const cardInfo = previousResult.board.lists[listIndex].cards[cardIndex];
					const current_card = Object.assign( {}, cardInfo, deleteCard );

					if ( current_card.id == 'loading' ) {
						const updated = update(previousResult, {
							board: {
								lists: {
									[listIndex]: {
										cards: {
											$splice: [[ cardIndex, 1, current_card ]]
										}
									}
								}
							},
						});
						return updated;
					}
					else {
						const updated = update(previousResult, {
							board: {
								lists: {
									[listIndex]: {
										cards: {
											$splice: [[ cardIndex, 1 ]]
										}
									}
								}
							},
						});
						return updated;
					}

				}
			},
		})
		.then( res => {
			loading_message();
			message.success( translate('messages.card.delete.success') );
		})
		.catch( res => {
			if ( res.graphQLErrors ) {
				const errors = res.graphQLErrors.map( error => error.message );
			}
		});


	}












	confirmDeletion(card) {
		const deleteCard = this.deleteCard;
		const props = this.props;
		Modal.confirm({
			title: translate('confirm.common.title'),
			content: translate('confirm.card.delete.description'),
			okText: translate('confirm.yes'),
			cancelText: translate('confirm.no'),
			onOk() {
				browserHistory.push(`/boards/${props.params.id}`);
				setTimeout(function() {
					deleteCard(card);
				}, 10);
			},
			onCancel() {},
		});
	}



	// components can call this method to update the details.
	mutate( data ) {
		this.setState({ processing: true });
		// const loading_message = message.loading('Updating card details..', 0);

		return this.props.mutate({
			variables: data.variables,
			optimisticResponse: {
				__typename: 'Mutation',
				updateCard: {
					__typename: 'Card',
					id: data.card.id,
					description: data.variables.description || data.card.description,
					title: data.variables.title || data.card.title,
					_list: data.card._list,
					meta: {
						duedate: data.variables.meta && data.variables.meta.duedate || data.card.meta.duedate,
						link: data.variables.meta && data.variables.meta.link || data.card.meta.link,
						image: data.variables.meta && data.variables.meta.image || data.card.meta.image,
						background_color: data.variables.meta && data.variables.meta.background_color || data.card.meta.background_color,
					},
				},
			},
			updateQueries: {
				BoardQuery: (previousResult, { mutationResult }) => {
					const updatedCard = mutationResult.data.updateCard;
					const listIndex = _.findIndex( previousResult.board.lists, { id: data.card._list } );
					const cardIndex = _.findIndex( previousResult.board.lists[listIndex].cards, { id: data.card.id } );
					const updated = update(previousResult, {
						board: {
							lists: {
								[listIndex]: {
									cards: {
										$splice: [[ cardIndex, 1, updatedCard ]]
									}
								}
							}
						},
					});
					return updated;
				}
			},
		})
		.then( res => {
			this.setState({ processing: false });
			// loading_message();
			message.success( translate('messages.card.update.success') );
			return res;
		})
		.catch( res => {
			if ( res.graphQLErrors ) {
				const errors = res.graphQLErrors.map( error => error.message );
			}
		});


	}



	setActiveTab(tab) {
		this.setState({ tab: tab || 'default' });
	}



	render() {

		// console.log('props', this.props);

		const list = _.filter( this.props.data.board.lists, { cards: [ {id: this.props.params.card_id} ] } )[0];

		if ( ! list ) {
			setTimeout( () => {
				message.error( translate('messages.card.delete.success') );
				this.handleCancel();
			}, 50);
			return <div></div>;
		}

		const card = _.find( list.cards, { id: this.props.params.card_id } );


		return (
			<Modal
				wrapClassName="modal__primary"
				visible={ true }
				maskClosable={ false }
				onCancel={ this.handleCancel }
				footer={[]}
			>
			<Spin spinning={ this.state.processing } size="large" tip={ this.state.delete_card ? translate('messages.card.processing.delete') : translate('messages.card.processing.update') } >

				<ModalHeader
					title={ card.title }
					subtitle={ <div><FormattedMessage id="card.show.heading.sub" defaultMessage="In list" /> <span className="underline">{ list.title }</span></div> }
					editable={ true }
					data={ card }
					mutate={ this.mutate }
				/>

				<div className="container card">

					<div className="content">
						{ this.state.tab === 'default' && <CardTabGeneral data={ card } mutate={ this.mutate } /> }
						{ this.state.tab === 'todo' && <CardTabTodoList data={ card } /> }
						{ this.state.tab === 'meta' && <CardTabMeta data={ card } mutate={ this.mutate } /> }
					</div>


					<div className="aside">

						<div className="actions">
							<Button
								size="small"
								type="primary"
								onClick={ () => { this.setActiveTab('default') } }
								disabled={ this.state.tab === 'default' }
								><FormattedMessage id="card.show.tab.general" defaultMessage="General" /></Button>
							<Button
								size="small"
								type="primary"
								onClick={ () => { this.setActiveTab('todo') } }
								disabled={ this.state.tab === 'todo' }
								><FormattedMessage id="card.show.tab.todo" defaultMessage="Todo List" /></Button>
							<Button
								size="small"
								type="primary"
								onClick={ () => { this.setActiveTab('meta') } }
								disabled={ this.state.tab === 'meta' }
								><FormattedMessage id="card.show.tab.meta" defaultMessage="Meta Details" /></Button>

							<Button
								size="small"
								type="danger"
								onClick={ () => { this.confirmDeletion(card) } }
								className="m-t-10"
								><FormattedMessage id="card.show.tab.delete" defaultMessage="Delete" /></Button>

						</div>

					</div>


				</div>


			</Spin>
			</Modal>
		);

	}

}

// export default graphql(updateCardMutation)(ShowCard);
export default graphql(updateCardMutation)(
	graphql(deleteCardMutation, { name: 'deleteCard' })(ShowCard)
);

