'use strict';

import React, { Component } from 'react';

import { Button, DatePicker, Tag, message } from 'antd';
import Helper from 'app/global/helper';
import moment from 'moment';

class ModalMeta extends Component {

	constructor(props) {
		super(props);
		this.state = {
			datepicker: false,
		}

		this.open = this.open.bind(this);
		this.close = this.close.bind(this);

		this.change = this.change.bind(this);
		this.update = this.update.bind(this);
	}



	open() {
		this.setState({ datepicker: true });
	}
	close() {
		this.setState({ datepicker: false });
	}


	change(date, datestring) {
		this.setState({ duedate: datestring, datepicker: false });
		setTimeout( () => {
			this.update();
		}, 80);
	}

	update() {
		// if ( ! this.state.duedate || this.state.duedate == this.props.data.meta.duedate ) {
		if ( this.state.duedate == this.props.data.meta.duedate ) {
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
			<div className="component__key_val">
				<div className="key">Duedate:</div>
				<div className="val">
					{ this.props.data.meta.duedate &&
						<Tag color={ Helper.date.style(this.props.data.meta.duedate) }>{ Helper.date.format(this.props.data.meta.duedate) }</Tag>
					}
					{ this.state.datepicker ?
						(
							<DatePicker
								placeholder="Select due date"
								defaultValue={ this.props.data.meta.duedate ? moment(this.props.data.meta.duedate) : moment() }
								onOpenChange={ this.close }
								onChange={ this.change }
								open={ this.state.datepicker }
							 />
						) : (
							<div>
								<Button
									type="primary"
									ghost
									size="small"
									onClick={ this.open }
								>
									{ this.props.data.meta.duedate ? 'Update Duedate' : 'Add Duedate' }
								</Button>
							</div>
						)
					}
				</div>
			</div>
		);

	}

}

export default ModalMeta;
