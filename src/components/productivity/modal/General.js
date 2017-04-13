'use strict';

import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import translate from 'app/global/helper/translate';

import { Icon, Input, Button, message } from 'antd';
import { MarkedPreview } from 'react-markdown-area';


class ModalGeneral extends Component {

	constructor(props) {
		super(props);
		this.state = {
			edit: false,
		}

		this.enableEdit = this.enableEdit.bind(this);
		this.disableEdit = this.disableEdit.bind(this);

		this.onInputChange = this.onInputChange.bind(this);
		this.updateDetails = this.updateDetails.bind(this);
	}


	// enable/disable edit status
	enableEdit() {
		this.setState({ edit: true });
	}
	disableEdit() {
		this.setState({ edit: false });
	}


	onInputChange(event) {
		this.setState({ description: event.target.value });
	}

	updateDetails() {
		if ( ! this.state.description || this.state.description == this.props.data.description ) {
			return message.warning( translate('messages.card.update.description.warning') );
		}

		this.props.mutate({
			card: this.props.data,
			variables: {
				id: this.props.data.id,
				description: this.state.description
			}
		})
		.then( res => {
			this.setState({ edit: false });
		});

	}



	renderDescription() {
		return(
			<div className="value component__custom_scrollbar" onClick={ this.enableEdit }>
				<MarkedPreview
					classNames={{ textContainer: 'card--description' }}
					value={ this.props.data.description } />
			</div>
		);
	}


	renderEmptyContent() {
		return(
			<div className="empty--content" onClick={ this.enableEdit }>
				<Icon type="bars" /><FormattedMessage id="card.general.description.edit" defaultMessage="Edit the description" />
			</div>
		);
	}

	renderPublic() {
		if ( ! this.props.data.description ) {
			return(
				<div className="empty--content">
					<Icon type="bars" /><FormattedMessage id="card.general.description.empty" defaultMessage="No description has been added for this card yet." />
				</div>
			);
		} else {
			return(
				<div className="value public component__custom_scrollbar">
					<MarkedPreview
						classNames={{ textContainer: 'card--description' }}
						value={ this.props.data.description } />
				</div>
			);
		}
	}



	render() {

		if ( this.props.public ) {
			return (
				<div>
					<div className="heading"><FormattedMessage id="card.general.heading" defaultMessage="General Details" /></div>
					{ this.renderPublic() }
				</div>
			);
		}

		return (
			<div>
				<div className="heading"><FormattedMessage id="card.general.heading" defaultMessage="General Details" /></div>

				{ this.state.edit ?
					(
						<div className="edit-description component__custom_scrollbar">
							<Input
								type="textarea"
								placeholder={ translate('card.general.form.placeholder', 'Enter your description here. (Markdown allowed)') }
								defaultValue={ this.props.data.description }
								onChange={ this.onInputChange }
								autosize={{ minRows: 6, maxRows: 16 }}
								autoFocus={true}
							/>
							<div className="m-t-10">
								<Button type="primary" onClick={ this.updateDetails } >{ this.props.data.description ? <FormattedMessage id="card.general.form.update" defaultMessage="Update Description" /> : <FormattedMessage id="card.general.form.save" defaultMessage="Save Description" /> }</Button>
								<Button type="ghost" onClick={ this.disableEdit } className="m-l-10"><FormattedMessage id="form.cancel" defaultMessage="Cancel" /></Button>
							</div>
						</div>
					) : (
						this.props.data.description ?
						(
							this.renderDescription()
						) : (
							this.renderEmptyContent()
						)
					)
				}

			</div>
		);

	}

}

export default ModalGeneral;
