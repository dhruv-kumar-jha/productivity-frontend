'use strict';

import React, { Component } from 'react';

import { Icon, Input, Button, DatePicker, Tag, message } from 'antd';
import Duedate from './meta/Duedate';
import LinkComponent from './meta/Link';
import ImageComponent from './meta/Image';


class ModalMeta extends Component {

	constructor(props) {
		super(props);
		this.state = {
			datepicker: false,
		}

		this.openDuedatePicker = this.openDuedatePicker.bind(this);
		this.closeDuedatePicker = this.closeDuedatePicker.bind(this);

		this.onDuedatePickerChange = this.onDuedatePickerChange.bind(this);
		this.updateDetails = this.updateDetails.bind(this);
	}



	openDuedatePicker() {
		this.setState({ datepicker: true });
	}
	closeDuedatePicker() {
		this.setState({ datepicker: false });
	}


	onDuedatePickerChange(date, datestring) {
		this.setState({ duedate: datestring, datepicker: false });
		setTimeout( () => {
			this.updateDetails();
		}, 80);
	}

	updateDetails() {
		if ( ! this.state.duedate || this.state.duedate == this.props.data.meta.duedate ) {
			return message.error('Please make changes to the due date first');
		}

		this.props.mutate({
			card: this.props.data,
			variables: {
				id: this.props.data.id,
				meta: {
					duedate: this.state.duedate
				}
			}
		})
		.then( res => {
			this.setState({ datepicker: false });
		});

	}




	render() {

		return (
			<div className="component__key_val_wrapper">
	
				<Duedate
					data={ this.props.data }
					mutate={ this.props.mutate }
				/>

				<LinkComponent
					data={ this.props.data }
					mutate={ this.props.mutate }
				/>

				<ImageComponent
					data={ this.props.data }
					mutate={ this.props.mutate }
				/>

			</div>
		);

	}

}

export default ModalMeta;
