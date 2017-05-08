'use strict';

import React, { Component } from 'react';
import { browserHistory } from 'react-router';

import { Modal, Spin, Icon, message, Button, Form, Input } from 'antd';
import ModalHeader from 'app/components/productivity/modal/Header';
const FormItem = Form.Item;

import { graphql } from 'react-apollo';
import UpdateGroupMutation from 'app/graphql/mutations/groups/Update';
import GetAllGroupsQuery from 'app/graphql/queries/groups/All';
import Loading from 'app/components/common/Loading';

import _ from 'lodash';
import update from 'immutability-helper';


class EditGroup extends Component {

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
			if ( ! err ) {
				const group = _.find( this.props.data.groups, { id: this.props.params.id } );

				if (
						fields.name === group.name &&
						fields.description === group.description
					) {
						return message.warning('Please make changes first before updating.');
				}

				this.setState({ processing: true });

				this.props.mutate({
					variables: {
						id: group.id,
						name: fields.name,
						description: fields.description,
					},
					optimisticResponse: {
						__typename: 'Mutation',
						updateGroup: {
							__typename: 'Group',
							id: group.id,
							name: fields.name,
							description: fields.description,
							status: group.status,
						},
					},
					// updateQueries: {
					// 	AllGroups: (previousResult, { mutationResult }) => {
					// 		const updateGroup = mutationResult.data.updateGroup;
					// 		const groupIndex = _.findIndex( previousResult.groups, { id: group.id } );
					// 		const updated = update(previousResult, {
					// 			groups: {
					// 				$splice: [[ groupIndex, 1, updateGroup ]]
					// 			},
					// 		});
					// 		return updated;
					// 	}
					// },
				})
				.then( res => {
					this.setState({ processing: false });
					message.success('Group details has been successfully updated.');
				})
				.catch( res => {
					if ( res.graphQLErrors ) {
						const errors = res.graphQLErrors.map( error => error.message );
					}
				});


			}
		});
	}




	resetForm() {
		this.props.form.resetFields();
	}


	render() {

		if ( this.props.data.loading ) {
			return <Loading />
		}

		const { groups } = this.props.data;
		const group = _.find( groups, { id: this.props.params.id } );


		const { getFieldDecorator } = this.props.form;

		return (
			<Modal
				wrapClassName="modal__primary"
				visible={ true }
				maskClosable={ false }
				onCancel={ this.handleCancel }
				footer={[]}
			>
			<Spin spinning={ this.state.processing } size="large" tip="Updating group, Please wait..." >

				<ModalHeader
					title={ <div><span>Update Group:</span> { group.name }</div> }
					subtitle="Change the details below and click on Update to save changes.."
					editable={ false }
					icon="plus-square-o"
				/>

				<div className="container">
				<div className="content full">

					<Form layout="vertical" onSubmit={ this.handleFormSubmit }>

							<FormItem label="Group Name" hasFeedback>
								{ getFieldDecorator('name', {
									rules: [{ required: true, message: 'Please enter group name' }],
									initialValue: group.name,
								})(
									<Input placeholder="Group Name" autoComplete="off" autoFocus={true} />
								) }
							</FormItem>
							<FormItem label="Group Description" hasFeedback >
								{ getFieldDecorator('description', {
									initialValue: group.description,
								})(
									<Input type="textarea" placeholder="Group Description" autosize={{ minRows: 3, maxRows: 6 }} />
								) }
							</FormItem>


							<FormItem className="m-b-0">
								<Button type="primary" size="default" icon="check" htmlType="submit">Update Group</Button>
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



EditGroup = Form.create()(EditGroup);

export default graphql(GetAllGroupsQuery)(
	graphql(UpdateGroupMutation, { name: 'mutate' })(EditGroup)
);


