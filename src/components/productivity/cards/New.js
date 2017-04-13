'use strict';

import React, { Component } from 'react';
import { defineMessages, injectIntl, FormattedMessage } from 'react-intl';
import translate from 'app/global/helper/translate';

import { graphql } from 'react-apollo';
import AddCardMutation from 'app/graphql/mutations/cards/Add';

import { Button, Spin, message } from 'antd';

import update from 'immutability-helper';


class NewCard extends Component {


	constructor(props) {
		super(props);
		this.state = {
			show_form: false,
			processing: false,
			card_title: '',
		};
		this.addNewCard = this.addNewCard.bind(this);
		this.handleFormSubmit = this.handleFormSubmit.bind(this);
		this.onCancel = this.onCancel.bind(this);

		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleInputOnEnter = this.handleInputOnEnter.bind(this);
	}

	addNewCard(e) {
		this.setState({ show_form: true });
	}

	onCancel(e) {
		this.setState({ show_form: false });
	}

	handleInputChange(e) {
		const title = e.target.value;
		this.setState({ card_title: title });
	}

	handleInputOnEnter(e) {
		if ( e.key === 'Enter' ) {
			e.preventDefault();
			this.handleFormSubmit();
		}
	}


	handleFormSubmit() {
		if ( ! this.state.card_title ) {
			return message.error( translate('messages.card.new.empty') ,3);
		}

		this.setState({ processing: true });
		// const loading_message = message.loading('Adding new card..', 0);

		this.props.mutate({
			variables: {
				_list: this.props.list.id,
				title: this.state.card_title,
				description: '',
			},
			optimisticResponse: {
				__typename: 'Mutation',
				addCard: {
					__typename: 'Card',
					_list: this.props.list.id,
					id: 'loading',
					title: this.state.card_title,
					description: '',
					meta: {},
					todos: [],
				},
			},
			updateQueries: {
				BoardQuery: (previousResult, { mutationResult }) => {
					this.setState({ processing: false, show_form: false, card_title: '' });
					const newCard = mutationResult.data.addCard;
					const listIndex = _.findIndex( previousResult.board.lists, { id: this.props.list.id } );
					const updated = update(previousResult, {
						board: {
							lists: {
								[listIndex]: {
									cards: {
										$push: [newCard],
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
			// loading_message();

			message.success( translate('messages.card.new.success') );
		})
		.catch( res => {
			if ( res.graphQLErrors ) {
				const errors = res.graphQLErrors.map( error => error.message );
				this.setState({ processing: false });
			}
		});



	}




	render() {

		const messages = defineMessages({
			placeholderTitle: { id: "card.form.title", defaultMessage: "Enter card title" },
		});
		const { formatMessage } = this.props.intl;

	
		const add_new_card_link = () => {
			return (
				<div className="" onClick={ this.addNewCard }>
					<a className="add-card"><FormattedMessage id="card.title" defaultMessage="Add New Card" /></a>
				</div>
			);
		}

		const add_new_card_form = () => {
			return (
				<div className="card__new">
				<Spin spinning={ this.state.processing } size="large">
					<textarea placeholder={formatMessage(messages.placeholderTitle)} onKeyPress={ this.handleInputOnEnter } onChange={ this.handleInputChange } autoFocus value={this.state.card_title}></textarea>
					<div className="links">
						<Button type="primary" onClick={ this.handleFormSubmit }><FormattedMessage id="card.form.add" defaultMessage="Add" /></Button>
						<Button type="danger" onClick={ this.onCancel } icon="close" />
					</div>
				</Spin>
				</div>
			);
		}


		return (
			<div className="card-creator">
				{ this.state.show_form ?
					add_new_card_form() : add_new_card_link()
				}
			</div>
		);

	}

}


NewCard = injectIntl(NewCard);

export default graphql(AddCardMutation)(NewCard);


