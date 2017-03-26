'use strict';

import React, { Component } from 'react';
import { Col, Input } from 'antd';

const colorValidator = (color) => {
	const validColor = /^#[0-9A-F]{6}$/i.test(color);
	return validColor;
}

class ColorPicker extends Component {

	constructor(props) {
		super(props);
		const value = this.props.value

		let pickerColor = '#000000';
		if ( colorValidator(value) ) { pickerColor = value; }

		this.state = {
			colorpicker: pickerColor || '',
			color: value || '',
		};

		this.colorpickerChange = this.colorpickerChange.bind(this);
		this.inputChange = this.inputChange.bind(this);
		this.triggerChange= this.triggerChange.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		if ('value' in nextProps) {
			const value = nextProps.value;
			const updates = {
				color: value
			}

			if ( colorValidator(value) ) { updates.colorpicker = value }
			else { updates.colorpicker = '#000000'; }

			this.setState(updates);
		}
	}

	triggerChange(changedValue) {
		const onChange = this.props.onChange;
		if (onChange) {
			onChange(changedValue);
		}
	}



	colorpickerChange(e) {
		const colorpicker = e.target.value;
		this.setState({ colorpicker: colorpicker, color: colorpicker });
		this.triggerChange(colorpicker);
	}

	inputChange(e) {
		const color = e.target.value;
		this.setState({ color });
		this.triggerChange(color);
	}



	render() {

		return(
			<div>
				<Col span="5">
					<Input type="color" id={ this.props.id } value={ this.state.colorpicker } onChange={ this.colorpickerChange } />
				</Col>
				<Col span="18" offset="1">
					<Input placeholder="Color" value={ this.state.color } onChange={ this.inputChange } onKeyPress={this.props.onKeyPress || null } autoComplete="off" />
				</Col>
			</div>
		)

	}

}

export default ColorPicker;
