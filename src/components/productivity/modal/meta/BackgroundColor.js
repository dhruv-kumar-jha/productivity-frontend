'use strict';

import React, { Component } from 'react';
import { Input, Button, Tag, message } from 'antd';


class BackgroundColor extends Component {

	constructor(props) {
		super(props);
		this.state = {
			edit: false,
			background_color: null,
		}

		this.open = this.open.bind(this);
		this.close = this.close.bind(this);

		this.change = this.change.bind(this);
		this.update = this.update.bind(this);
		this.enter = this.enter.bind(this);

		this.resetBackgroundColor = this.resetBackgroundColor.bind(this);
	}



	open() {
		this.setState({ edit: true });
	}
	close() {
		this.setState({ edit: false, background_color: null });
	}


	change(event) {
		this.setState({ background_color: event.target.value });
	}

	enter(event) {
		if ( event.key === 'Enter' ) {
			event.preventDefault();
			this.update();
		}
	}

	resetBackgroundColor() {
		this.setState({ background_color: '' });
		setTimeout( () => {
			return this.update();
		}, 10);
	}


	update() {
		if ( this.state.background_color === null || this.state.background_color == this.props.data.meta.background_color ) {
			return message.error('Please enter/update the background color first');
		}

		this.props.mutate({
			card: this.props.data,
			variables: {
				id: this.props.data.id,
				meta: {
					background_color: this.state.background_color
				}
			}
		})
		.then( res => {
			this.setState({ edit: false });
		});

	}




	render() {



		if ( this.props.public ) {
			return (
				<div className="component__key_val">
					<div className="key">Background:</div>
					<div className="val">
						{ this.props.data.meta.background_color ?
							( <Tag color={this.props.data.meta.background_color}>{this.props.data.meta.background_color}</Tag> ) :
							( <p>Background color not set</p> )
						}
					</div>
				</div>
			);
		}



		return (
			<div className="component__key_val">
				<div className="key">Background:</div>
				<div className="val">
					{ ! this.state.edit && this.props.data.meta.background_color &&
						<div className="full-width flex flex--sb">
							<div className="flex">
								<Tag color={this.props.data.meta.background_color}>{this.props.data.meta.background_color}</Tag>
								<Button type="primary" ghost size="small" onClick={ this.resetBackgroundColor } className="m-l-10">Reset Background Color</Button>
							</div>
							<Button type="primary" ghost size="small" onClick={ this.open } className="m-l-10">{ this.props.data.meta.background_color ? 'Update Background Color' : 'Set Background Color' }</Button>
						</div>
					}

					{ ! this.state.edit && ! this.props.data.meta.background_color &&
						<Button type="primary" ghost size="small" onClick={ this.open }>Set Background Color</Button>
					}

					{ this.state.edit &&
						<div className="data--edit--inline flex row nowrap">
							<Input
								type="color"
								placeholder="Background Color"
								defaultValue={ this.props.data.meta.background_color }
								onChange={ this.change }
								onKeyPress={ this.enter }
								autoFocus={ true }
							/>
							<Button
								type="primary"
								size="small"
								className="m-l-10"
								onClick={ this.update }>{ this.props.data.meta.background_color ? 'Update Background' : 'Set Background' }</Button>
							<Button
								type="ghost"
								size="small"
								onClick={ this.close }
								className="m-l-5">Cancel</Button>

						</div>
					}
				</div>
			</div>
		);

	}

}

export default BackgroundColor;

