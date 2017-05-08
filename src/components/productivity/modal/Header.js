'use strict';

import React, { Component } from 'react';
import { Icon, Input, Button, message } from 'antd';
import { FormattedMessage } from 'react-intl';
import translate from 'app/global/helper/translate';


class ModalHeader extends Component {

	constructor(props) {
		super(props);
		this.state = {
			edit: false,
			title: this.props.title || '',
		}

		this.enableEdit = this.enableEdit.bind(this);
		this.disableEdit = this.disableEdit.bind(this);

		this.onInputChange = this.onInputChange.bind(this);
		this.onInputEnter = this.onInputEnter.bind(this);
		this.updateDetails = this.updateDetails.bind(this);
	}


	// enable/disable edit status
	enableEdit() {
		this.setState({ edit: true });
	}
	disableEdit() {
		this.setState({ edit: false, title: this.props.title });
	}


	onInputChange(event) {
		this.setState({ title: event.target.value });
	}

	onInputEnter(event) {
		if ( event.key === 'Enter' ) {
			event.preventDefault();
			this.updateDetails();
		}
	}

	updateDetails() {
		if ( ! this.state.title || this.state.title == this.props.data.title ) {
			return message.warning( translate('messages.card.title.update.empty') );
		}

		this.props.mutate({
			card: this.props.data,
			variables: {
				id: this.props.data.id,
				title: this.state.title
			}
		})
		.then( res => {
			this.setState({ edit: false });
		});

	}



	showNormalTitle() {
		return(
			<header>
				<Icon type={ this.props.icon || 'laptop' } />
				<div className="info">
					<div className="title">{ this.props.title }</div>
					<div className="list">{ this.props.subtitle }</div>
				</div>
			</header>
		);
	}



	render() {

		if ( ! this.props.editable ) {
			return this.showNormalTitle();
		}


		return (
			<header>

				<Icon type={ this.props.icon || 'laptop' } />
				<div className="info">
					<div className="title editable">
						{ this.state.edit ?
							(
								<div className="flex row nowrap">
									<Input
										placeholder={translate('card.header.title.placeholder', 'Card Title')}
										// value={ this.state.title || this.props.title }
										value={ this.state.title }
										onChange={ this.onInputChange }
										onKeyPress={ this.onInputEnter }
										autoFocus={ true }
									/>
									<Button
										type="primary"
										className="m-l-10"
										onClick={ this.updateDetails }><FormattedMessage id="form.update" defaultMessage="Update" /></Button>
									<Button
										type="ghost"
										onClick={ this.disableEdit }
										className="m-l-5"><FormattedMessage id="form.cancel" defaultMessage="Cancel" /></Button>
								</div>
							) : (
								<div onClick={ this.enableEdit }>{ this.props.title }</div>
							)
						}
					</div>
					<div className="list">{ this.props.subtitle }</div>
				</div>

			</header>
		);

	}

}

export default ModalHeader;
