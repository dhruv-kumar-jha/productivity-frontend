'use strict';

import React, { Component } from 'react';
import Heading from 'app/components/common/Heading';
import { defineMessages, injectIntl, FormattedMessage } from 'react-intl';
import translate from 'app/global/helper/translate';

import { graphql } from 'react-apollo';
import GetCurrentUserQuery from 'app/graphql/queries/auth/CurrentUser';
import UpdateUserMutation from 'app/graphql/mutations/user/Update';
import update from 'immutability-helper';
import Helper from 'app/global/helper';

import Loading from 'app/components/common/Loading';

import { Icon, Col, Form, Input, DatePicker, Select, Button, Spin, message } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;


class GeneralSettings extends Component {

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
						fields.password === user.password &&
						fields.language === user.language
					)
				{
					return message.warning( translate('messages.settings.warning') );
				}


				this.setState({ processing: true });

				const loading_message = message.loading( translate('messages.settings.processing') , 0);

				this.props.updateUser({
					variables: {
						id: user.id,
						name: fields.name,
						email: fields.email,
						password: fields.password,
						language: fields.language,
					},
					optimisticResponse: {
						__typename: 'Mutation',
						updateUser: {
							__typename: 'User',
							id: user.id,
							name: fields.name,
							email: fields.email,
							language: fields.language,
						},
					},
					updateQueries: {
						CurrentUser: (previousResult, { mutationResult }) => {
							const updateUser = mutationResult.data.updateUser;
							// console.log('updateUser',updateUser);
							return update(previousResult, {
								current_user: {
									name: { $set: updateUser.name },
									email: { $set: updateUser.email },
									language: { $set: updateUser.language },
								},
							});
						}
					},
				})
				.then( res => {
					this.setState({ processing: false });
					loading_message();
					message.success( translate('messages.settings.success') );
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
			return <Loading text={ translate('messages.settings.loading') } />;
		}


		const user = this.props.data.current_user;

		const messages = defineMessages({
			placeholderName: { id: "auth.form.placeholder.name", defaultMessage: "Ex: John Doe" },
			placeholderEmail: { id: "auth.form.placeholder.email", defaultMessage: "Ex: john.doe@gmail.com" },
			placeholderPassword: { id: "auth.form.placeholder.password", defaultMessage: "Password" },

			validateName: { id: "auth.form.validate.name", defaultMessage: "Please enter your Full Name" },
			validateEmail: { id: "auth.form.validate.email", defaultMessage: "Please enter your Email Address" },
			validateInvalidEmail: { id: "auth.form.validate.invalid_email", defaultMessage: "Please enter a valid email address" },
			processingSettings: { id: "settings.form.processing", defaultMessage: "Updating details..." },
		});
		const { formatMessage } = this.props.intl;


		const { getFieldDecorator } = this.props.form;
		const formItemLayout = { labelCol: { span: 24 }, wrapperCol: { span: 24 }, };
		const tailFormItemLayout = { wrapperCol: { span: 24, offset: 0 }, };


		return (
			<Col xs={24} sm={{ span: 22, offset: 0 }} md={{ span: 20, offset: 0 }} lg={{ span: 16, offset: 0 }}>


					<Form layout="vertical" onSubmit={ this.handleFormSubmit }>
					<Spin spinning={ this.state.processing } tip={formatMessage(messages.processingSettings)} size="large">

						<FormItem {...formItemLayout} label={<FormattedMessage id="form.name" defaultMessage="Full Name" />} >
							{ getFieldDecorator('name', {
								rules: [{ required: true, message: formatMessage(messages.validateName) }],
								initialValue: user.name,
							})(
								<Input addonBefore={<Icon type="user" />} placeholder={ formatMessage(messages.placeholderName, { name: 'John Doe' }) } autoComplete="off" autoFocus />
							) }
						</FormItem>

						<FormItem {...formItemLayout} label={<FormattedMessage id="form.email" defaultMessage="Email Address" />} >
							{ getFieldDecorator('email', {
								rules: [
									{ type: 'email', message: formatMessage(messages.validateInvalidEmail) },
									{ required: true, message: formatMessage(messages.validateEmail) },
								],
								initialValue: user.email,
							})(
								<Input addonBefore={<Icon type="mail" />} placeholder={ formatMessage(messages.placeholderEmail, { email: 'john.doe@gmail.com' }) } autoComplete="off" />
							) }
						</FormItem>

						<FormItem {...formItemLayout} label={<FormattedMessage id="form.password" defaultMessage="Password" />} extra={<FormattedMessage id="settings.form.password_help" defaultMessage="If you enter new password here, your existing password will be updated." />} extra>
							{ getFieldDecorator('password')(
								<Input addonBefore={<Icon type="lock" />} type="password" placeholder={ formatMessage(messages.placeholderPassword) } />
							) }
						</FormItem>


						<FormItem {...formItemLayout} label={<FormattedMessage id="settings.form.language" defaultMessage="Select Language" />}>
							{ getFieldDecorator('language', {
								initialValue: user.language
							})(
								<Select placeholder="Select Language">
									<Option value="en">English</Option>
									<Option value="zh">Chinese</Option>
								</Select>
							) }
						</FormItem>


						<FormItem {...tailFormItemLayout} className="m-b-0">
							<Button type="primary" size="default" icon="check" htmlType="submit"><FormattedMessage id="settings.form.update_details" defaultMessage="Update Details" /></Button>
							<Button type="ghost" size="default" icon="reload" onClick={ this.resetForm } className="m-l-10"><FormattedMessage id="form.reset" defaultMessage="Reset" /></Button>
						</FormItem>

					</Spin>
					</Form>

			</Col>
		);

	}

}


GeneralSettings = Form.create()(GeneralSettings);
GeneralSettings = injectIntl(GeneralSettings);

export default graphql(GetCurrentUserQuery)(
	graphql(UpdateUserMutation, { name: 'updateUser' })(GeneralSettings)
);
