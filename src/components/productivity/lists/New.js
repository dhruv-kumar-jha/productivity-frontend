'use strict';

import React, { Component } from 'react';

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

				const loading_message = message.loading('Adding new list..', 0);

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
					loading_message();
					message.success('New list has been successfully added.');
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

		const add_new_list_link = () => {
			return (
				<div className="list">
					<div className="card" onClick={ this.addNewList }>
						<div>Create New List...</div>
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
						title="Add New List"
						extra={ <a className="cancel" onClick={ this.onCancel }><Icon type="close" /></a> }
					>
					<Spin spinning={ this.state.processing } size="large">

						<FormItem hasFeedback>
							{ getFieldDecorator('title', {
								rules: [{ required: true, message: 'Please enter List Title' }],
							})(
								<Input placeholder="List Title" autoComplete="off" autoFocus />
							) }
						</FormItem>

						<FormItem hasFeedback >
							{ getFieldDecorator('description')(
								<Input type="textarea" placeholder="List description" autosize={{ minRows: 3, maxRows: 6 }} />
							) }
						</FormItem>

						<FormItem className="m-b-0">
							<Button type="primary" size="default" icon="plus" htmlType="submit">Create</Button>
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
export default graphql(AddListMutation)(NewList);

