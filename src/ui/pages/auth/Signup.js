'use strict';

import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { defineMessages, injectIntl, FormattedMessage } from 'react-intl';
import translate from 'app/global/helper/translate';

import { graphql } from 'react-apollo';
import SingupMutation from 'app/graphql/mutations/auth/Signup';

import { Row, Col, Form, Icon, Input, Button, Spin, Checkbox, Alert, message, notification } from 'antd';
const FormItem = Form.Item;


class Signup extends Component {

	constructor(props) {
		super(props);
		this.state = {
			errors: [],
			hide_errors: false,
			user: {
			},
			processing: false,
			confirmDirty: false,
		};
		this.handleFormSubmit = this.handleFormSubmit.bind(this);
		this.handleReset = this.handleReset.bind(this);

		this.checkPassword = this.checkPassword.bind(this);
		this.checkConfirm = this.checkConfirm.bind(this);
		this.handleConfirmBlur = this.handleConfirmBlur.bind(this);
		this.validateEmail = this.validateEmail.bind(this);

		this.handleErrorsClose = this.handleErrorsClose.bind(this);
	}

	handleFormSubmit(e) {
		e.preventDefault();
		this.props.form.validateFields( (err, fields) => {
			if ( ! err ) {
				this.setState({ processing: true });
				this.props.mutate({
					variables: {
						name: fields.name,
						email: fields.email,
						password: fields.password,
					}
				})
				.then( res => {
					this.setState({ processing: false });
					message.success( translate('messages.signup.success') , 4);
					browserHistory.push('/auth/login');
				})
				.catch( res => {
					const errors = res.graphQLErrors.map( error => error.message );
					this.setState({ errors, processing: false, hide_errors: false });
				});
			}
		});
	}

	handleReset(e) {
		e.preventDefault();
		this.props.form.resetFields();
	}


	handleConfirmBlur(e) {
		const value = e.target.value;
		this.setState({ confirmDirty: this.state.confirmDirty || !!value });
	}
	checkPassword(rule, value, callback) {
		const form = this.props.form;
		if ( value && value !== form.getFieldValue('password')) {
			callback('Please enter the same password in both password fields');
		} else {
			callback();
		}
	}
	checkConfirm(rule, value, callback) {
		const form = this.props.form;
		if ( value && this.state.confirmDirty ) {
			form.validateFields(['verifyPassword'], { force: true });
		}
		callback();
	}

	validateEmail(rule, value, callback) {
		const messages = defineMessages({
			validateEmail: { id: "auth.form.validate.email", defaultMessage: "Please enter your Email Address" },
			validateInvalidEmail: { id: "auth.form.validate.invalid_email", defaultMessage: "Please enter a valid email address" },
		});
		const { formatMessage } = this.props.intl;


		if ( ! value ) {
			callback( formatMessage(messages.validateEmail) );
		} else {
			const email_validator = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			if ( email_validator.test(value) ) {
				callback();
			} else {
				callback( formatMessage(messages.validateInvalidEmail) );
			}
		}
	}


	handleErrorsClose() {
		this.setState({ hide_errors: true });
	}






	render() {

		const messages = defineMessages({
			placeholderEmail: { id: "auth.form.placeholder.email", defaultMessage: "Ex: john.doe@gmail.com" },
			placeholderPassword: { id: "auth.form.placeholder.password", defaultMessage: "Password" },
			placeholderRePassword: { id: "auth.form.placeholder.re_password", defaultMessage: "Re-enter Password" },
			placeholderName: { id: "auth.form.placeholder.name", defaultMessage: "Ex: John Doe" },

			validateError: { id: "form.error", defaultMessage: "Error Occurred" },
			validateName: { id: "auth.form.validate.name", defaultMessage: "Please enter your Full Name" },
			validatePassword: { id: "auth.form.validate.password", defaultMessage: "Please enter your Password" },
			validateRePassword: { id: "auth.form.validate.re_password", defaultMessage: "Please re-enter your Password" },
			validateTerms: { id: "auth.form.validate.terms", defaultMessage: "You must agree to Terms and Conditions" },
			processingSignup: { id: "auth.form.processing.signup", defaultMessage: "Creating your account..." },
		});
		const { formatMessage } = this.props.intl;

		const { getFieldDecorator } = this.props.form;
		// const formItemLayout = { labelCol: { span: 8 }, wrapperCol: { span: 16 }, };
		const formItemLayout = { labelCol: { xs: { span: 24 }, lg: { span: 8 } }, wrapperCol: { xs: { span: 24 }, lg: { span: 16 } }, };
		// const tailFormItemLayout = { wrapperCol: { span: 16, offset: 8 }, };
		const tailFormItemLayout = { labelCol: { xs: { span: 24 }, lg: { span: 8 } }, wrapperCol: { xs: { span: 24 }, lg: { span: 16, offset: 8 } }, };

		return (
			<div className="component__signup">

				<Row className="m-b-30">
				<Col xs={{ span: 24 }} lg={{ span: 16, offset: 8 }}>
					<h1 className="heading--title"><FormattedMessage id="auth.signup.title" defaultMessage="Create New Account" /></h1>
					<p className="heading--subtitle"><FormattedMessage id="auth.signup.subtitle" defaultMessage="Please enter your details below to create new account." /></p>
				</Col>
				</Row>


				<Spin spinning={ this.state.processing } size="large" tip={formatMessage(messages.processingSignup)} >
				<Form onSubmit={ this.handleFormSubmit } className="login-form">

					{ this.state.errors.length > 0 && ! this.state.hide_errors &&
						<Alert
							message={ formatMessage(messages.validateError) }
							description={ this.state.errors.map( (error, index) => <p key={index}>{ error }</p> ) }
							type="error"
							showIcon
							closable
							onClose={ this.handleErrorsClose }
							className="m-b-30"
						/>
					}


					<FormItem {...formItemLayout} label={<FormattedMessage id="form.name" defaultMessage="Full Name" />} >
						{ getFieldDecorator('name', {
							rules: [{ required: true, message: formatMessage(messages.validateName) }],
							initialValue: this.state.user.name,
						})(
							<Input addonBefore={<Icon type="user" />} placeholder={ formatMessage(messages.placeholderName, { name: 'John Doe' }) } autoComplete="off" autoFocus />
						) }
					</FormItem>

					<FormItem {...formItemLayout} label={<FormattedMessage id="form.email" defaultMessage="Email Address" />} >
						{ getFieldDecorator('email', {
							rules: [
								{ validator: this.validateEmail },
							],
							initialValue: this.state.user.email,
						})(
							<Input addonBefore={<Icon type="mail" />} placeholder={ formatMessage(messages.placeholderEmail, { email: 'john.doe@gmail.com' }) } autoComplete="off" />
						) }
					</FormItem>

					<FormItem {...formItemLayout} label={<FormattedMessage id="form.password" defaultMessage="Password" />} >
						{ getFieldDecorator('password', {
							rules: [
								{ required: true, message: formatMessage(messages.validatePassword) },
								{ validator: this.checkConfirm },
							],
							initialValue: this.state.user.password,
						})(
							<Input addonBefore={<Icon type="lock" />} type="password" placeholder={ formatMessage(messages.placeholderPassword) } />
						) }
					</FormItem>


					<FormItem {...formItemLayout} label={<FormattedMessage id="auth.form.verify_password" defaultMessage="Verify Password" />} >
						{ getFieldDecorator('verifyPassword', {
							rules: [
								{ required: true, message: formatMessage(messages.validateRePassword) },
								{ validator: this.checkPassword },
							],
							initialValue: this.state.user.verifyPassword,
						})(
							<Input addonBefore={<Icon type="lock" />} type="password" placeholder={ formatMessage(messages.placeholderRePassword) } onBlur={this.handleConfirmBlur} />
						) }
					</FormItem>


					<FormItem {...tailFormItemLayout}>
						{ getFieldDecorator('agreement', {
							rules: [ { required: true, message: formatMessage(messages.validateTerms) } ],
							valuePropName: 'checked',
						})(
							<Checkbox><FormattedMessage id="auth.form.terms_and_conditions" defaultMessage="I have read and agree to the terms and conditions." /></Checkbox>
						)}
					</FormItem>


					<FormItem className="m-b-0" {...tailFormItemLayout}>
						<Button type="primary" size="default" icon="check-circle-o" htmlType="submit" className="auth--button--signup"><FormattedMessage id="auth.form.signup" defaultMessage="Signup" /></Button>
						<Button type="ghost" size="default" icon="reload" onClick={ this.handleReset } className="auth--button--reset" style={{ marginLeft: 10 }}><FormattedMessage id="form.reset" defaultMessage="Reset" /></Button>
					</FormItem>

				</Form>
				</Spin>

			</div>
		);
	}

}

Signup = Form.create()(Signup);
Signup = injectIntl(Signup);

export default graphql(SingupMutation)(Signup);
