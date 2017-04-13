'use strict';

import React, { Component } from 'react';
import { defineMessages, injectIntl, FormattedMessage } from 'react-intl';
import translate from 'app/global/helper/translate';

import { graphql } from 'react-apollo';
import AddListMutation from 'app/graphql/mutations/lists/Add';

import _ from 'lodash';
import update from 'immutability-helper';

import { Col, Icon, Form, Input, Button, Spin, Card, message } from 'antd';
const FormItem = Form.Item;


class NewList extends Component {

	constructor(props) {
		super(props);
		this.state = {
			show_form: false,
			processing: false,
		};
		this.addNewList = this.addNewList.bind(this);
		this.handleFormSubmit = this.handleFormSubmit.bind(this);
		this.onCancel = this.onCancel.bind(this);
	}

	addNewList(e) {
		this.setState({ show_form: true });
	}

	onCancel(e) {
		this.setState({ show_form: false });
	}



	handleFormSubmit(e) {
		e.preventDefault();
		this.props.form.validateFields( (err, fields) => {
			if ( ! err ) {
				this.setState({ processing: true });

				// const loading_message = message.loading('Adding new list..', 0);

				this.props.mutate({
					variables: {
						_board: this.props.board.id,
						title: fields.title,
						description: fields.description,
					},
					optimisticResponse: {
						__typename: 'Mutation',
						addList: {
							__typename: 'List',
							id: 'loading',
							title: fields.title,
							description: fields.description || '',
							meta: {},
							positions: [],
							cards: [],
							created_at: +new Date,
							updated_at: +new Date,
						},
					},
					updateQueries: {
						BoardQuery: (previousResult, { mutationResult }) => {
							this.setState({ processing: false, show_form: false });
							const newList = mutationResult.data.addList;
							return update(previousResult, {
								board: {
									lists: {
										$push: [newList],
									},
								},
							});
						}
					},
				})
				.then( res => {
					// loading_message();
					message.success( translate('messages.list.new.success') );
				})
				.catch( res => {
					if ( res.graphQLErrors ) {
						const errors = res.graphQLErrors.map( error => error.message );
						this.setState({ processing: false });
					}
				});

			}
		});
	}



	render() {

		const messages = defineMessages({
			placeholderTitle: { id: "list.card.form.placeholder.title", defaultMessage: "List Title" },
			placeholderDescription: { id: "list.card.form.placeholder.description", defaultMessage: "List Description" },
			validateTitle: { id: "list.card.form.validate.title", defaultMessage: "Please enter List Title" },
		});
		const { formatMessage } = this.props.intl;

		const add_new_list_link = () => {
			return (
				<div className="list">
					<div className="card" onClick={ this.addNewList }>
						<div><FormattedMessage id="list.card.title" defaultMessage="Create New List..." /></div>
					</div>
				</div>
			);
		}


		const add_new_list_form = () => {

			const { getFieldDecorator } = this.props.form;

			return (
				<div className="list component__card__form">
				<Form layout="vertical" onSubmit={ this.handleFormSubmit }>

					<Card
						className="form-card"
						title={ <FormattedMessage id="list.card.heading" defaultMessage="Add New List" /> }
						extra={ <a className="cancel" onClick={ this.onCancel }><Icon type="close" /></a> }
					>
					<Spin spinning={ this.state.processing } size="large">

						<FormItem hasFeedback>
							{ getFieldDecorator('title', {
								rules: [{ required: true, message: formatMessage(messages.validateTitle) }],
							})(
								<Input
									placeholder={ formatMessage(messages.placeholderTitle) }
									autoComplete="off"
									autoFocus />
							) }
						</FormItem>

						<FormItem hasFeedback >
							{ getFieldDecorator('description')(
								<Input
									type="textarea"
									placeholder={ formatMessage(messages.placeholderDescription) }
									autosize={{ minRows: 3, maxRows: 6 }} />
							) }
						</FormItem>

						<FormItem className="m-b-0">
							<Button type="primary" size="default" icon="plus" htmlType="submit"><FormattedMessage id="form.create" defaultMessage="Create" /></Button>
						</FormItem>

					</Spin>
					</Card>

				</Form>
				</div>
			);
		}



		return (
			<div className="component__list__new">
				{ this.state.show_form ?
					add_new_list_form() : add_new_list_link()
				}
			</div>
		);


	}

}


NewList = Form.create()(NewList);
NewList = injectIntl(NewList);

export default graphql(AddListMutation)(NewList);

