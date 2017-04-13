'use strict';

import React, { Component } from 'react';
import { Checkbox, Input, Button, Spin, message } from 'antd';
import { FormattedMessage } from 'react-intl';
import translate from 'app/global/helper/translate';


import { graphql } from 'react-apollo';
import AddTodoCardMutation from 'app/graphql/mutations/cards/AddTodo';
import update from 'immutability-helper';

import TodoItem from './todos/Item';


/**
 * [TODO]
 * ADD TODO ITEM ON ENTER.
 */

class ModalTodo extends Component {

	constructor(props) {
		super(props);
		this.state = {
			add: false,
			processing: false,
		};
		this.showAddItemForm = this.showAddItemForm.bind(this);
		this.hideAddItemForm = this.hideAddItemForm.bind(this);
		this.updateField = this.updateField.bind(this);
		this.addTodo = this.addTodo.bind(this);
	}


	showAddItemForm() {
		this.setState({ add: true });
	}

	hideAddItemForm() {
		this.setState({ add: false, title: null, description: null });
	}

	updateField(event, field) {
		this.setState({ [field]: event.target.value })
	}

	// addTodo: start
	addTodo() {
		if ( ! this.state.title ) {
			return message.warning( translate('messages.card.todo.title.empty') );
		}

		this.setState({ processing: true });

		const loading_message = message.loading( translate('messages.card.todo.processing') , 0);

		this.props.addTodo({
			variables: {
				_card: this.props.data.id,
				title: this.state.title,
				description: this.state.description,
			},
			optimisticResponse: {
				__typename: 'Mutation',
				addTodo: {
					__typename: 'Todo',
					_id: 'loading',
					title: this.state.title,
					description: this.state.description,
				},
			},
			updateQueries: {
				BoardQuery: (previousResult, { mutationResult }) => {
					const newTodo = mutationResult.data.addTodo;
					const listIndex = _.findIndex( previousResult.board.lists, { id: this.props.data._list } );
					const cardIndex = _.findIndex( previousResult.board.lists[listIndex].cards, { id: this.props.data.id } );

					// this.setState({ processing: false, add: false });

					const updated = update(previousResult, {
						board: {
							lists: {
								[listIndex]: {
									cards: {
										[cardIndex]: {
											todos: {
												$push: [newTodo],
											}
										}
									}
								}
							}
						},
					});
					this.setState({ processing: false, add: false, title: null, description: null });
					return updated;
				}
			},
		})
		.then( res => {
			loading_message();
			// this.setState({ processing: false, add: false, title: null, description: null });
			message.success( translate('messages.card.todo.success') );
		})
		.catch( res => {
			if ( res.graphQLErrors ) {
				const errors = res.graphQLErrors.map( error => error.message );
				this.setState({ processing: false });
			}
		});

	}
	// addTodo: end


	render() {

		const addTodoForm = () => {
			return(
				<Spin spinning={ this.state.processing } tip={ translate('card.todo.form.processing', 'Adding item..') } size="large">
				<div className="component__todo_list add_new">
					<div>
						<Input
							placeholder={ translate('card.todo.form.placeholder.title', 'Todo Title') }
							autoFocus={true}
							onChange={ (event) => { this.updateField(event, 'title' ) } }
						/>
						<Input
							type="textarea"
							placeholder={ translate('card.todo.form.placeholder.description', 'Please enter todo description here') }
							autosize={{ minRows: 3, maxRows: 5 }}
							className="m-t-5"
							onChange={ (event) => { this.updateField(event, 'description' ) } }
						/>
					</div>
					<div className="m-t-10">
						<Button type="primary" onClick={ this.addTodo }><FormattedMessage id="card.todo.form.add" defaultMessage="Add Todo" /></Button>
						<Button type="ghost" className="m-l-5" onClick={ this.hideAddItemForm }><FormattedMessage id="form.cancel" defaultMessage="Cancel" /></Button>
					</div>
				</div>
				</Spin>
			);
		}



		if ( this.props.public ) {
			if ( this.props.data.todos && this.props.data.todos.length < 1 ) {
				return(
					<div className="component__todo_list empty">
						<p><FormattedMessage id="card.todo.public.empty" defaultMessage="No todo items has been added for this card yet." /></p>
					</div>
				);
			}
			return (
				<div className="component__todo_list">
					{ this.props.data.todos.map( todo => <TodoItem key={todo._id} data={todo} card={{ id: this.props.data.id, _list: this.props.data._list }} public={true} /> ) }
				</div>
			);
		}



		return (
			<div>

				{ this.props.data.todos && this.props.data.todos.length > 0 &&
					<div className="component__todo_list">
						{ this.props.data.todos.map( todo => <TodoItem key={todo._id} data={todo} card={{ id: this.props.data.id, _list: this.props.data._list }} /> ) }
					</div>
				}

				{ this.props.data.todos && this.props.data.todos.length < 1 &&
					<div className="component__todo_list empty">
						<p><FormattedMessage id="card.todo.empty" defaultMessage="You haven't added any items to todo list yet." /></p>
					</div>
				}

				<div className="m-t-20">
				{ this.state.add ?
					(
						addTodoForm()
					) : (
						<Button ghost type="primary" icon="plus" onClick={ this.showAddItemForm }><FormattedMessage id="card.todo.form.add_item" defaultMessage="Add new Item" /></Button>
					)
				}
				</div>


			</div>
		);

	}

}

// export default ModalTodo;
export default graphql(AddTodoCardMutation, { name: 'addTodo' })(ModalTodo);

