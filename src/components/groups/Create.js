'use strict';

import React, { Component } from 'react';
import { browserHistory } from 'react-router';

import { Modal, Spin, Icon, message, Button, Form, Input } from 'antd';
import ModalHeader from 'app/components/productivity/modal/Header';
const FormItem = Form.Item;

import { graphql } from 'react-apollo';
import AddGroupMutation from 'app/graphql/mutations/groups/Add';

import _ from 'lodash';
import update from 'immutability-helper';


class CreateGroup extends Component {

	constructor(props) {
		super(props);
		this.state = {
			processing: false,
		};
		this.handleFormSubmit = this.handleFormSubmit.bind(this);
		this.resetForm = this.resetForm.bind(this);
	}

	handleCancel() {
		browserHistory.push('/settings/groups');
	}

	handleFormSubmit(e) {
		e.preventDefault();
		this.props.form.validateFields( (err, fields) => {

			if ( err ) {
				return message.error("Please enter group name, It's required.");
			}

			this.setState({ processing: true });

			this.props.mutate({
				variables: {
					name: fields.name,
					description: fields.description,
				},
				optimisticResponse: {
					__typename: 'Mutation',
					addGroup: {
						__typename: 'Group',
						id: 'loading',
						name: fields.name,
						description: fields.description,
						status: 1,
					},
				},
				updateQueries: {
					AllGroups: (previousResult, { mutationResult }) => {
						const newGroup = mutationResult.data.addGroup;
						const updated = update(previousResult, {
							groups: {
								$push: [newGroup],
							}
						});
						return updated;
					}
				},
			})
			.then( res => {
				message.success("New Group has been successfully added.");
				this.setState({ processing: false });
				this.props.cancel();
			})
			.catch( res => {
				if ( res.graphQLErrors ) {
					const errors = res.graphQLErrors.map( error => error.message );
					this.setState({ processing: false });
				}
			});


		});
	}


	resetForm() {
		this.props.form.resetFields();
	}


	render() {


		const { getFieldDecorator } = this.props.form;

		return (
			<Modal
				wrapClassName="modal__primary"
				visible={ true }
				maskClosable={ false }
				onCancel={ this.handleCancel }
				footer={[]}
			>
			<Spin spinning={ this.state.processing } size="large" tip="Adding group, Please wait..." >

				<ModalHeader
					title={ <div><span>Groups:</span> Add New Group</div> }
					subtitle="Enter the group details below and click on Create."
					editable={ false }
					icon="plus-square-o"
				/>

				<div className="container">
				<div className="content full">

					<Form layout="vertical" onSubmit={ this.handleFormSubmit }>

							<FormItem label="Group Name" hasFeedback>
								{ getFieldDecorator('name', {
									rules: [{ required: true, message: 'Please enter group name' }],
									initialValue: '',
								})(
									<Input placeholder="Group Name" autoComplete="off" autoFocus={true} />
								) }
							</FormItem>
							<FormItem label="Group Description" hasFeedback >
								{ getFieldDecorator('description', {
									initialValue: '',
								})(
									<Input type="textarea" placeholder="Group Description" autosize={{ minRows: 3, maxRows: 6 }} />
								) }
							</FormItem>


							<FormItem className="m-b-0">
								<Button type="primary" size="default" icon="check" htmlType="submit">Add Group</Button>
								<Button type="ghost" size="default" icon="reload" onClick={ this.resetForm } className="m-l-10">Reset</Button>
							</FormItem>


					</Form>

				</div>
				</div>

			</Spin>
			</Modal>
		);


	}

}



CreateGroup = Form.create()(CreateGroup);
export default graphql(AddGroupMutation)(CreateGroup);

