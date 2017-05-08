'use strict';

import React, { Component } from 'react';
import { defineMessages, injectIntl, FormattedMessage } from 'react-intl';
import translate from 'app/global/helper/translate';

import { graphql } from 'react-apollo';
import AddBoardMutation from 'app/graphql/mutations/boards/Add';
import GetAllGroupsQuery from 'app/graphql/queries/groups/All';

import update from 'immutability-helper';
import Loading from 'app/components/common/Loading';

import { Col, Icon, Form, Input, Button, Spin, Select, Card, message } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;


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
						group: fields.group,
					},
					optimisticResponse: {
						__typename: 'Mutation',
						addBoard: {
							__typename: 'Board',
							id: 'loading',
							title: fields.title,
							description: fields.description || '',
							group: fields.group,
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
					message.success( translate('messages.board.new.success') , 4);
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


		if ( this.props.data.loading ) {
			return <Loading />
		}


		const groups = this.props.data.groups;


		const messages = defineMessages({
			placeholderTitle: { id: "board.card.form.placeholder.title", defaultMessage: "Board Title" },
			placeholderDescription: { id: "board.card.form.placeholder.description", defaultMessage: "Board Description" },
			validateTitle: { id: "board.card.form.validate.title", defaultMessage: "Please enter Board Title" },
		});
		const { formatMessage } = this.props.intl;


		const add_new_board_link = () => {
			return (
				<div className="board create" onClick={ this.addNewBoard }>
					<div className="title"><FormattedMessage id="board.card.title" defaultMessage="Create New Board" /></div>
				</div>
			);
		}


		const add_new_board_form = () => {

			const { getFieldDecorator } = this.props.form;

			return (
				<div className="board create create-form card__form" style={{ zIndex: 10 }}>
				<Form layout="vertical" onSubmit={ this.handleFormSubmit }>

					<Card
						className="form-card"
						title={<FormattedMessage id="board.card.heading" defaultMessage="Add New Board" />}
						extra={ <a className="cancel" onClick={ this.onCancel }><Icon type="close" /></a> }
					>
					<Spin spinning={ this.state.processing } size="large">

						<FormItem hasFeedback>
							{ getFieldDecorator('title', {
								rules: [{ required: true, message: formatMessage(messages.validateTitle) }],
							})(
								<Input placeholder={formatMessage(messages.placeholderTitle)} autoComplete="off" autoFocus />
							) }
						</FormItem>

						<FormItem hasFeedback >
							{ getFieldDecorator('description')(
								<Input type="textarea" placeholder={formatMessage(messages.placeholderDescription)} autosize={{ minRows: 3, maxRows: 6 }} />
							) }
						</FormItem>

						{ groups.length > 0 &&
						<FormItem hasFeedback >
							{ getFieldDecorator('group')(
								<Select
									placeholder="Select Group"
									allowClear={true}
									showSearch
									filterOption={ (input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0 }
								>
									{ groups.map( group => <Option key={group.id} value={group.id}>{group.name}</Option> ) }
								</Select>
							) }
						</FormItem>
						}

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
			<Col xs={24} sm={12} md={8} lg={6} className="board-container">
				{ this.state.show_form ?
					add_new_board_form() : add_new_board_link()
				}
			</Col>
		);

	}

}

NewBoard = Form.create()(NewBoard);
NewBoard = injectIntl(NewBoard);

// export default graphql(AddBoardMutation)(NewBoard);
export default graphql(GetAllGroupsQuery)(
	graphql(AddBoardMutation, { name: 'mutate' })(NewBoard)
);

