'use strict';

import React, { Component } from 'react';
import Heading from 'app/components/common/Heading';
import CommonLayout from 'app/components/layout/Common';

import { graphql } from 'react-apollo';
import GetCurrentUserQuery from 'app/graphql/queries/auth/CurrentUser';
import UpdateUserMutation from 'app/graphql/mutations/user/Update';
import update from 'immutability-helper';
import Helper from 'app/global/helper';

import Loading from 'app/components/common/Loading';

import { Icon, Col, Form, Input, DatePicker, Select, Button, Spin, message } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;


class Setting extends Component {

	constructor(props) {
		super(props);
		this.state = {
			processing: false,
		}
		this.resetForm = this.resetForm.bind(this);
		this.handleFormSubmit = this.handleFormSubmit.bind(this);
	}


	resetForm() {
		this.props.form.resetFields();
	}

	handleFormSubmit(e) {
		e.preventDefault();
		this.props.form.validateFields( (err, fields) => {
			if ( ! err ) {

				const user = this.props.data.current_user;

				if (
						fields.name === user.name &&
						fields.email === user.email &&
						fields.password === user.password
					)
				{
					return message.warning("You haven't made any changes yet.");
				}


				this.setState({ processing: true });

				const loading_message = message.loading('Updating your details..', 0);

				this.props.updateUser({
					variables: {
						id: user.id,
						name: fields.name,
						email: fields.email,
						password: fields.password,
					},
					optimisticResponse: {
						__typename: 'Mutation',
						updateUser: {
							__typename: 'User',
							id: user.id,
							name: fields.name,
							email: fields.email,
						},
					},
					updateQueries: {
						CurrentUser: (previousResult, { mutationResult }) => {
							const updateUser = mutationResult.data.updateUser;
							console.log('updateUser',updateUser);
							return update(previousResult, {
								current_user: {
									name: { $set: updateUser.name },
									email: { $set: updateUser.email },
								},
							});
						}
					},
				})
				.then( res => {
					this.setState({ processing: false });
					loading_message();
					message.success('Your details has been successfully updated.');
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


		if ( this.props.data.loading ) {
			return <Loading text="Loading user details..." />;
		}


		const user = this.props.data.current_user;


		const { getFieldDecorator } = this.props.form;
		const formItemLayout = { labelCol: { span: 24 }, wrapperCol: { span: 24 }, };
		const tailFormItemLayout = { wrapperCol: { span: 24, offset: 0 }, };


		return (
			<CommonLayout>

				<Heading
					title="Manage your Settings"
					subtitle="Manage and update your personal information, login details from here."
					icon="setting" />

				<div className="m-t-30 m-b-50">
				<Col xs={24} sm={{ span: 22, offset: 1 }} md={{ span: 20, offset: 1 }} lg={{ span: 16, offset: 1 }}>


					<Form layout="vertical" onSubmit={ this.handleFormSubmit }>
					<Spin spinning={ this.state.processing } tip="Updating details..." size="large">

						<FormItem {...formItemLayout} label="Full Name">
							{ getFieldDecorator('name', {
								rules: [{ required: true, message: 'Please enter your Full Name' }],
								initialValue: user.name,
							})(
								<Input addonBefore={<Icon type="user" />} placeholder="Ex: John Doe" autoComplete="off" autoFocus />
							) }
						</FormItem>

						<FormItem {...formItemLayout} label="Email Address">
							{ getFieldDecorator('email', {
								rules: [
									{ type: 'email', message: 'Please enter a valid email address' },
									{ required: true, message: 'Please enter your Email Address' },
								],
								initialValue: user.email,
							})(
								<Input addonBefore={<Icon type="mail" />} placeholder="Ex: john.doe@gmail.com" autoComplete="off" />
							) }
						</FormItem>

						<FormItem {...formItemLayout} label="Password" extra="If you enter new password here, your existing password will be updated,">
							{ getFieldDecorator('password')(
								<Input addonBefore={<Icon type="lock" />} type="password" placeholder="Password" />
							) }
						</FormItem>


						<FormItem {...tailFormItemLayout} className="m-b-0">
							<Button type="primary" size="default" icon="check" htmlType="submit">Update Details</Button>
							<Button type="ghost" size="default" icon="reload" onClick={ this.resetForm } className="m-l-10">Reset</Button>
						</FormItem>

					</Spin>
					</Form>

				</Col>
				</div>

			</CommonLayout>
		);

	}

}


Setting = Form.create()(Setting);
export default graphql(GetCurrentUserQuery)(
	graphql(UpdateUserMutation, { name: 'updateUser' })(Setting)
);
