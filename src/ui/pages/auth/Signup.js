'use strict';

import React, { Component } from 'react';
import { browserHistory } from 'react-router';

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
					message.success('Your account has been successfully created.', 4);
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

	handleErrorsClose() {
		this.setState({ hide_errors: true });
	}






	render() {

		const { getFieldDecorator } = this.props.form;
		const formItemLayout = { labelCol: { span: 8 }, wrapperCol: { span: 16 }, };
		const tailFormItemLayout = { wrapperCol: { span: 16, offset: 8 }, };

		return (
			<div className="component__signup">

				<Row className="m-b-30">
				<Col span="16" offset="8">
					<h1>Create New Account</h1>
					<p>Please enter your details below to create new account.</p>
				</Col>
				</Row>


				<Spin spinning={ this.state.processing } size="large" tip="Creating your account...">
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


					<FormItem {...formItemLayout} label="Full Name">
						{ getFieldDecorator('name', {
							rules: [{ required: true, message: 'Please enter your Full Name' }],
							initialValue: this.state.user.name,
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
							initialValue: this.state.user.email,
						})(
							<Input addonBefore={<Icon type="mail" />} placeholder="Ex: john.doe@gmail.com" autoComplete="off" />
						) }
					</FormItem>

					<FormItem {...formItemLayout} label="Password">
						{ getFieldDecorator('password', {
							rules: [
								{ required: true, message: 'Please enter your Password' },
								{ validator: this.checkConfirm },
							],
							initialValue: this.state.user.password,
						})(
							<Input addonBefore={<Icon type="lock" />} type="password" placeholder="Password" />
						) }
					</FormItem>


					<FormItem {...formItemLayout} label="Verify Password">
						{ getFieldDecorator('verifyPassword', {
							rules: [
								{ required: true, message: 'Please re-enter your Password' },
								{ validator: this.checkPassword },
							],
							initialValue: this.state.user.verifyPassword,
						})(
							<Input addonBefore={<Icon type="lock" />} type="password" placeholder="Re-enter Password" onBlur={this.handleConfirmBlur} />
						) }
					</FormItem>


					<FormItem {...tailFormItemLayout}>
						{ getFieldDecorator('agreement', {
							rules: [ { required: true, message: 'You must agree to Terms and Conditions' } ],
							valuePropName: 'checked',
						})(
							<Checkbox>I have read and agree to the <a>terms and conditions</a>.</Checkbox>
						)}
					</FormItem>




					<FormItem className="m-b-0" {...tailFormItemLayout}>
						<Button type="primary" size="default" icon="check-circle-o" htmlType="submit">Signup</Button>
						<Button type="ghost" size="default" icon="reload" onClick={ this.handleReset } style={{ marginLeft: 10 }}>Reset</Button>
					</FormItem>

				</Form>
				</Spin>

			</div>
		);
	}

}

Signup = Form.create()(Signup);

export default graphql(SingupMutation)(Signup);
