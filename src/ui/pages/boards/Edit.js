'use strict';

import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import { FormattedMessage } from 'react-intl';
import translate from 'app/global/helper/translate';

import { graphql } from 'react-apollo';
import UpdateBoardMutation from 'app/graphql/mutations/boards/Update';
import update from 'immutability-helper';
import GetAllGroupsQuery from 'app/graphql/queries/groups/All';
import Loading from 'app/components/common/Loading';

import { Modal, Icon, Col, Form, Input, Button, Spin, Select, message } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
import ColorPicker from 'app/components/common/ColorPicker';

import ModalHeader from 'app/components/productivity/modal/Header';


class BoardEdit extends Component {

	constructor(props) {
		super(props);
		this.state = {
			processing: false,
		}
		this.handleCancel = this.handleCancel.bind(this);
		this.handleFormSubmit = this.handleFormSubmit.bind(this);
		this.resetForm = this.resetForm.bind(this);
		this.setBackgroundColor = this.setBackgroundColor.bind(this);
		this.setBackgroundImage = this.setBackgroundImage.bind(this);

		this.resetBackground = this.resetBackground.bind(this);
	}


	handleCancel() {
		this.props.setParentState({ background: '', background_image: '' });
		browserHistory.push(`/boards/${this.props.params.id}`);
	}

	resetForm() {
		this.props.form.resetFields();
		this.props.setParentState({
			background: this.props.data.board.meta ? this.props.data.board.meta.background : '',
			background_image: this.props.data.board.meta ? this.props.data.board.meta.background_image : ''
		});
	}

	setBackgroundColor(event) {
		this.props.setParentState({ background: event.target.value });
	}
	setBackgroundImage(event) {
		this.props.setParentState({ background_image: event.target.value });
	}


	resetBackground(event) {
		this.props.form.setFieldsValue({
			'meta.background': null,
		});
		this.props.setParentState({ background: null });
		return this.handleFormSubmit(event);
	}


	handleFormSubmit(e) {
		e.preventDefault();
		this.props.form.validateFields( (err, fields) => {
			if ( ! err ) {

				if (
						fields.description === this.props.data.board.description &&
						fields.title === this.props.data.board.title &&
						fields.group === this.props.data.board.group &&
						( this.props.data.board.meta && fields.meta.background == this.props.data.board.meta.background ) &&
						( this.props.data.board.meta && fields.meta.background_image == this.props.data.board.meta.background_image )
					) {
						return message.warning( translate('messages.board.update.warning') );
				}

				this.setState({ processing: true });
				// const loading_message = message.loading('Updating board details..', 0);

				this.props.mutate({
					variables: {
						id: this.props.data.board.id,
						title: fields.title,
						description: fields.description,
						group: fields.group,
						meta: {
							background: fields.meta.background,
							background_image: fields.meta.background_image,
						}
					},
					optimisticResponse: {
						__typename: 'Mutation',
						updateBoard: {
							__typename: 'Board',
							id: this.props.data.board.id,
							title: fields.title,
							description: fields.description,
							group: fields.group,
							meta: {
								background: fields.meta.background,
								background_image: fields.meta.background_image,
							}
						},
					},
					updateQueries: {
						BoardQuery: (previousResult, { mutationResult }) => {
							const updatedBoard = mutationResult.data.updateBoard;
							const updated = update(previousResult, {
								board: {
									title: { $set: updatedBoard.title },
									description: { $set: updatedBoard.description },
									group: { $set: updatedBoard.group },
									meta: { $set: updatedBoard.meta },
								},
							});
							return updated;
						}
					},
				})
				.then( res => {
					this.setState({ processing: false });
					// loading_message();
					message.success( translate('messages.board.update.success') );
				})
				.catch( res => {
					if ( res.graphQLErrors ) {
						const errors = res.graphQLErrors.map( error => error.message );
					}
				});

			}
		});
	}



	render() {


		const { board } = this.props.data;
		const { getFieldDecorator } = this.props.form;

		if ( this.props.groups.loading ) {
			return <Loading />
		}

		const groups = this.props.groups.groups;

		const BackgroundImageLinks = () => {
			return (
				<div className="background-image-suggestions">
					<strong><FormattedMessage id="board.background.inspirations" defaultMessage="Inspirations" /></strong>
					<span className="m-l-10">
						<a href="https://pixabay.com/" target="_blank">Pixabay</a>
						<a href="https://unsplash.com/" target="_blank" className="m-l-5">Unsplash</a>
					</span>
				</div>
			);
		}



		return (
			<Modal
				wrapClassName="modal__primary"
				visible={ true }
				maskClosable={ false }
				onCancel={ this.handleCancel }
				footer={[]}
			>

				<ModalHeader
					title={ <div><span><FormattedMessage id="board.header.title" defaultMessage="Board" />:</span> {board.title}</div> }
					subtitle={ <FormattedMessage id="board.header.subtitle" defaultMessage="Enter the board details below and click on update." /> }
					editable={ false }
				/>

				<div className="container">
				<div className="content full">

					<Form layout="vertical" onSubmit={ this.handleFormSubmit }>

						<Spin spinning={ this.state.processing } size="large">
							<FormItem label={ <FormattedMessage id="board.form.label.title" defaultMessage="Board Title" /> } hasFeedback>
								{ getFieldDecorator('title', {
									rules: [{ required: true, message: translate('board.form.validate.title', 'Please enter Board Title') }],
									initialValue: board.title,
								})(
									<Input placeholder={ translate('board.form.placeholder.title', 'Board Title') } autoComplete="off" />
								) }
							</FormItem>
							<FormItem label={ <FormattedMessage id="board.form.label.description" defaultMessage="Board Description" /> } hasFeedback >
								{ getFieldDecorator('description', {
									initialValue: board.description,
								})(
									<Input type="textarea" placeholder={ translate('board.form.placeholder.description', 'Board description') } autosize={{ minRows: 3, maxRows: 6 }} />
								) }
							</FormItem>

							{ groups.length > 0 &&
							<FormItem label="Select Board Group" hasFeedback >
								{ getFieldDecorator('group', {
									initialValue: board.group || null,
								})(
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

							<Input.Group style={{ marginBottom: 24 }}>
								<Col span="8">
									<FormItem label={ <FormattedMessage id="board.form.label.background" defaultMessage="Board Background" /> } >
										{ getFieldDecorator('meta.background', {
											initialValue: board.meta.background || null,
										})(
											<ColorPicker />
										) }
									</FormItem>
								</Col>
								<Col span="15" offset="1">
									<FormItem label={ <FormattedMessage id="board.form.label.background_image" defaultMessage="Board Background Image" /> } help={ <BackgroundImageLinks /> } hasFeedback>
										{ getFieldDecorator('meta.background_image', {
											initialValue: board.meta.background_image || null,
										})(
											<Input placeholder={ translate('board.form.placeholder.background_image_url', 'Background image URL') } onChange={ this.setBackgroundImage } autoComplete="off" />
										) }
									</FormItem>
								</Col>
							</Input.Group>

							<FormItem className="m-b-0">
								<Button type="primary" size="default" icon="check" htmlType="submit"><FormattedMessage id="board.form.update" defaultMessage="Update Details" /></Button>
								<Button type="ghost" size="default" icon="reload" onClick={ this.resetForm } className="m-l-10"><FormattedMessage id="form.reset" defaultMessage="Reset" /></Button>
								{ board.meta.background &&
									<Button type="ghost" size="default" icon="reload" onClick={ this.resetBackground } className="float-right"><FormattedMessage id="board.form.reset_background" defaultMessage="Reset Background" /></Button>
								}
							</FormItem>
						</Spin>

					</Form>

				</div>
				</div>

			</Modal>
		);

	}


}


BoardEdit = Form.create()(BoardEdit);
// export default graphql(UpdateBoardMutation)(BoardEdit);

export default graphql(UpdateBoardMutation, { name: 'mutate' })(
	graphql(GetAllGroupsQuery,{ name: 'groups' })(BoardEdit)
);

