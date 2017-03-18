'use strict';

import React, { Component } from 'react';

import { graphql } from 'react-apollo';
import AddBoardMutation from 'app/graphql/mutations/boards/Add';

import update from 'immutability-helper';

import { Col, Icon, Form, Input, Button, Spin, Card, message } from 'antd';
const FormItem = Form.Item;


class NewBoard extends Component {

	constructor(props) {
		super(props);
		this.state = {
			show_form: false,
			processing: false,
		};
		this.addNewBoard = this.addNewBoard.bind(this);
		this.handleFormSubmit = this.handleFormSubmit.bind(this);
		this.onCancel = this.onCancel.bind(this);
	}


	addNewBoard(e) {
		this.setState({ show_form: true });
	}

	handleFormSubmit(e) {
		e.preventDefault();
		this.props.form.validateFields( (err, fields) => {
			if ( ! err ) {
				this.setState({ processing: true });
				this.props.mutate({
					variables: {
						title: fields.title,
						description: fields.description,
					},
					optimisticResponse: {
						__typename: 'Mutation',
						addBoard: {
							__typename: 'Board',
							id: 'loading',
							title: fields.title,
							description: fields.description || '',
							meta: {},
							lists: [],
							positions: [],
							status: 1,
							created_at: +new Date,
							updated_at: +new Date,
						},
					},
					updateQueries: {
						AllBoards: (previousResult, { mutationResult }) => {
							const newBoard = mutationResult.data.addBoard;
							this.setState({ processing: false, show_form: false });
							return update(previousResult, { boards: { $push: [newBoard] } });
						}
					},
				})
				.then( res => {
					message.success('New board has been successfully added.', 4);
				})
				.catch( res => {
					if ( res.graphQLErrors ) {
						const errors = res.graphQLErrors.map( error => error.message );
						console.log('errors',errors);
						this.setState({ processing: false });
					}
				});
			}
		});
	}

	onCancel(e) {
		this.setState({ show_form: false });
	}




	render() {

		const add_new_board_link = () => {
			return (
				<div className="board create" onClick={ this.addNewBoard }>
					<div className="title">Create New Board</div>
				</div>
			);
		}


		const add_new_board_form = () => {

			const { getFieldDecorator } = this.props.form;

			return (
				<div className="board create create-form card__form">
				<Form layout="vertical" onSubmit={ this.handleFormSubmit }>

					<Card
						className="form-card"
						title="Add New Board"
						extra={ <a className="cancel" onClick={ this.onCancel }><Icon type="close" /></a> }
					>
					<Spin spinning={ this.state.processing } size="large">

						<FormItem hasFeedback>
							{ getFieldDecorator('title', {
								rules: [{ required: true, message: 'Please enter Board Title' }],
							})(
								<Input placeholder="Board Title" autoComplete="off" autoFocus />
							) }
						</FormItem>

						<FormItem hasFeedback >
							{ getFieldDecorator('description')(
								<Input type="textarea" placeholder="Board description" autosize={{ minRows: 3, maxRows: 6 }} />
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
			<Col xs={24} sm={12} md={8} lg={6} className="board-container">
				{ this.state.show_form ?
					add_new_board_form() : add_new_board_link()
				}
			</Col>
		);

	}

}

NewBoard = Form.create()(NewBoard);
export default graphql(AddBoardMutation)(NewBoard);


