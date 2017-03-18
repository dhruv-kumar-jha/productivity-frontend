'use strict';

import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';

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
					message.success('You have successfully logged in.', 4);
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


	render() {

		const { getFieldDecorator } = this.props.form;
		const formItemLayout = { wrapperCol: { span: 24 }, };
		const tailFormItemLayout = { wrapperCol: { span: 24, }, };

		return (
			<Row>
			<div className="component__login">

				<div className="m-b-30">
					<h1>Login to your Account</h1>
					<p>Please enter your details to login.</p>
				</div>


				<Spin spinning={ this.state.processing } size="large" tip="Logging you in...">
				<Form onSubmit={ this.handleFormSubmit } className="login-form">

					{ this.state.errors.length > 0 && ! this.state.hide_errors &&
						<Alert
							message="Error Occoured"
							description={ this.state.errors.map( (error, index) => <p key={index}>{ error }</p> ) }
							type="error"
							showIcon
							closable
							onClose={ this.handleErrorsClose }
							className="m-b-30"
						/>
					}

					<FormItem {...formItemLayout} label="Email Address">
						{ getFieldDecorator('email', {
							rules: [{ required: true, message: 'Please enter your Email Address' }],
						})(
							<Input addonBefore={<Icon type="mail" />} placeholder="Ex: john.doe@gmail.com" autoComplete="off" autoFocus />
						) }
					</FormItem>

					<FormItem {...formItemLayout} label="Password">
						{ getFieldDecorator('password', {
							rules: [{ required: true, message: 'Please enter your Password' }],
						})(
							<Input addonBefore={<Icon type="lock" />} type="password" placeholder="Password" />
						) }
					</FormItem>

					<FormItem className="m-b-0" {...tailFormItemLayout}>
						<Button type="primary" size="default" icon="lock" htmlType="submit">Login Now</Button>
						<Button type="ghost" size="default" icon="reload" onClick={ this.handleReset } style={{ marginLeft: 10 }}>Reset</Button>
					</FormItem>

				</Form>
				</Spin>

			</div>

			<div className="ta-center m-t-20">
				Don't have an account? <Link to="/auth/signup">Signup Now</Link>
			</div>
			</Row>
		);
	}

}

Login = Form.create()(Login);

export default graphql(LoginMutation)(Login);
