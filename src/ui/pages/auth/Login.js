'use strict';

import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import { defineMessages, injectIntl, FormattedMessage } from 'react-intl';
import translate from 'app/global/helper/translate';

import { graphql } from 'react-apollo';
import LoginMutation from 'app/graphql/mutations/auth/Login';
import Auth from 'app/global/api/Auth';

import { Row, Form, Icon, Input, Button, Spin, Alert, message } from 'antd';
const FormItem = Form.Item;


class Login extends Component {

	constructor(props) {
		super(props);
		this.state = {
			errors: [],
			hide_errors: false,
			processing: false,
		};
		this.handleFormSubmit = this.handleFormSubmit.bind(this);
		this.handleReset = this.handleReset.bind(this);
		this.handleErrorsClose = this.handleErrorsClose.bind(this);
		this.demoUserLogin = this.demoUserLogin.bind(this);
	}

	handleFormSubmit(e) {
		e.preventDefault();
		this.props.form.validateFields( (err, fields) => {
			if ( ! err ) {
				this.setState({ processing: true });
				this.props.mutate({
					variables: {
						email: fields.email,
						password: fields.password,
					},
				})
				.then( res => {
					const token = res.data.login.token;
					Auth.setAuthToken(token);
					this.setState({ processing: false });
					message.success( translate('messages.auth.success') );
					browserHistory.push('/dashboard');
				})
				.catch( res => {
					if ( res.graphQLErrors ) {
						const errors = res.graphQLErrors.map( error => error.message );
						this.setState({ errors, processing: false, hide_errors: false });
					}
				});
			}
		});
	}


	handleReset(e) {
		e.preventDefault();
		this.props.form.resetFields();
	}

	handleErrorsClose() {
		this.setState({ hide_errors: true });
	}

	demoUserLogin() {
		this.props.form.setFieldsValue({
			email: 'demo@demo.com',
			password: 'P@sSw0rd@123'
		});
	}


	render() {

		const messages = defineMessages({
			placeholderEmail: { id: "auth.form.placeholder.email", defaultMessage: "Ex: john.doe@gmail.com" },
			placeholderPassword: { id: "auth.form.placeholder.password", defaultMessage: "Password" },
			validateError: { id: "form.error", defaultMessage: "Error Occurred" },
			validateEmail: { id: "auth.form.validate.email", defaultMessage: "Please enter your Email Address" },
			validatePassword: { id: "auth.form.validate.password", defaultMessage: "Please enter your Password" },
			processingLogin: { id: "auth.form.processing.login", defaultMessage: "Logging you in..." },
		});
		const { formatMessage } = this.props.intl;

		const { getFieldDecorator } = this.props.form;
		const formItemLayout = { wrapperCol: { span: 24 }, };
		const tailFormItemLayout = { wrapperCol: { span: 24, }, };

		return (
			<Row>
			<div className="component__login">

				<div className="m-b-30">
					<h1 className="heading--title"><FormattedMessage id="auth.login.title" defaultMessage="Login to your Account" /></h1>
					<p className="heading--subtitle"><FormattedMessage id="auth.login.subtitle" defaultMessage="Please enter your details to login." /></p>
				</div>


				<Spin spinning={ this.state.processing } size="large" tip={formatMessage(messages.processingLogin)} >
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

					<FormItem {...formItemLayout} label={<FormattedMessage id="form.email" defaultMessage="Email Address" />} >
						{ getFieldDecorator('email', {
							rules: [{ required: true, message: formatMessage(messages.validateEmail) }],
						})(
							<Input addonBefore={<Icon type="mail" />} placeholder={ formatMessage(messages.placeholderEmail, { email: 'john.doe@gmail.com' }) } autoComplete="off" autoFocus />
						) }
					</FormItem>

					<FormItem {...formItemLayout} label={<FormattedMessage id="form.password" defaultMessage="Password" />} >
						{ getFieldDecorator('password', {
							rules: [{ required: true, message: formatMessage(messages.validatePassword) }],
						})(
							<Input addonBefore={<Icon type="lock" />} type="password" placeholder={ formatMessage(messages.placeholderPassword) } />
						) }
					</FormItem>

					<FormItem className="m-b-0" {...tailFormItemLayout}>
						<Button type="primary" size="default" icon="lock" className="auth--button--login" htmlType="submit"><FormattedMessage id="auth.form.login" defaultMessage="Login Now" /></Button>
						<Button type="ghost" size="default" icon="reload" onClick={ this.handleReset } className="auth--button--reset" style={{ marginLeft: 10 }}><FormattedMessage id="form.reset" defaultMessage="Reset" /></Button>
						<Button type="primary" size="default" icon="key" onClick={ this.demoUserLogin } className="auth--button--demo float-right"><FormattedMessage id="auth.form.demouser" defaultMessage="Demo" /></Button>
					</FormItem>

				</Form>
				</Spin>

			</div>

			<div className="ta-center m-t-20">
				<FormattedMessage id="auth.form.no_account" defaultMessage="Don't have an account?" /> <Link to="/auth/signup"><FormattedMessage id="auth.form.signup" defaultMessage="Signup Now" /></Link>
			</div>
			</Row>
		);
	}

}

Login = Form.create()(Login);
Login = injectIntl(Login);

export default graphql(LoginMutation)(Login);
