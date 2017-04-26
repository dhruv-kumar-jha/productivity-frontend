'use strict';

import React, { Component } from 'react';
import { Input, Button, message } from 'antd';
import { FormattedMessage } from 'react-intl';
import translate from 'app/global/helper/translate';


class ModalMeta extends Component {

	constructor(props) {
		super(props);
		this.state = {
			edit: false,
			position: {
				top: this.props.data.meta.position && this.props.data.meta.position.top,
				bottom: this.props.data.meta.position && this.props.data.meta.position.bottom
			}
		}

		this.open = this.open.bind(this);
		this.close = this.close.bind(this);

		this.change = this.change.bind(this);
		this.update = this.update.bind(this);
		this.enter = this.enter.bind(this);
	}



	open() {
		this.setState({ edit: true });
	}
	close() {
		this.setState({ edit: false, position: { top: null, bottom: null } });
	}


	change(event, field) {
		const pos = Object.assign( {}, this.state.position );
		pos[field] = event.target.value
		this.setState({ position: pos });
	}

	enter(event) {
		if ( event.key === 'Enter' ) {
			event.preventDefault();
			this.update();
		}
	}


	update() {

		const position = this.props.data.meta.position || {};

		if (
			( this.state.position.top === null && this.state.position.bottom === null ) ||
			( this.state.position.top == position.top && this.state.position.bottom == position.bottom )
		) {
			return message.error( translate('messages.card.position.error', 'Please enter/update the top and/or bottom values.') );
		}



		this.props.mutate({
			card: this.props.data,
			variables: {
				id: this.props.data.id,
				meta: {
					position: this.state.position
				}
			}
		})
		.then( res => {
			this.setState({ edit: false });
		});

	}




	render() {


		if ( this.props.public ) {
			return <div></div>
		}

		// if ( this.props.public ) {
		// 	return (
		// 		<div className="component__key_val">
		// 			<div className="key"><FormattedMessage id="card.meta.position.title" defaultMessage="Position" />:</div>
		// 			<div className="val">
		// 				<div className="full-width flex flex--sb">
		// 					<div className="position">
		// 						<span><FormattedMessage id="card.meta.position.label.top" defaultMessage="Top" />: { position.top || '-' }</span>, <span><FormattedMessage id="card.meta.position.label.bottom" defaultMessage="Bottom" />: { position.bottom || '-' }</span>
		// 					</div>
		// 				</div>
		// 			</div>
		// 		</div>
		// 	);
		// }

		const position = this.props.data.meta.position || {};


		return (
			<div className="component__key_val">
				<div className="key"><FormattedMessage id="card.meta.position.title" defaultMessage="Position" />:</div>
				<div className="val">
					{ ! this.state.edit && ( position.top || position.bottom ) &&
						<div className="full-width flex flex--sb">
							<div className="position">
								<span><FormattedMessage id="card.meta.position.label.top" defaultMessage="Top" />: { position.top || '-' }</span>, <span><FormattedMessage id="card.meta.position.label.bottom" defaultMessage="Bottom" />: { position.bottom || '-' }</span>
							</div>
							<Button type="primary" ghost size="small" onClick={ this.open } className="m-l-10">{ position.position ? <FormattedMessage id="card.meta.position.update" defaultMessage="Update Position" /> : <FormattedMessage id="card.meta.position.add" defaultMessage="Add Position" /> }</Button>
						</div>
					}

					{ ! this.state.edit && ! ( position.top || position.bottom ) &&
						<Button type="primary" ghost size="small" onClick={ this.open }><FormattedMessage id="card.meta.position.add" defaultMessage="Add Position" /></Button>
					}

					{ this.state.edit &&
						<div className="data--edit--inline flex row nowrap">
							<span className="label"><FormattedMessage id="card.meta.position.label.top" defaultMessage="Top" />: </span>
							<Input
								placeholder={ translate('card.meta.position.placeholder.top', 'Ex: 1') }
								defaultValue={ position.top }
								onChange={ (event) => { this.change(event,'top') } }
								onKeyPress={ this.enter }
								autoFocus={ true }
								style={{
									maxWidth: 100,
									marginRight: 10
								}}
							/>
							<span className="label"><FormattedMessage id="card.meta.position.label.bottom" defaultMessage="Bottom" />: </span>
							<Input
								placeholder={ translate('card.meta.position.placeholder.bottom', 'Ex: 1') }
								defaultValue={ position.bottom }
								onChange={ (event) => { this.change(event,'bottom') } }
								onKeyPress={ this.enter }
								style={{
									maxWidth: 100,
								}}
							/>
							<Button
								type="primary"
								size="small"
								className="m-l-10"
								onClick={ this.update }>{ position.top || position.bottom ? <FormattedMessage id="form.update" defaultMessage="Update" /> : <FormattedMessage id="form.add" defaultMessage="Add" /> }</Button>
							<Button
								type="ghost"
								size="small"
								onClick={ this.close }
								className="m-l-5"><FormattedMessage id="form.cancel" defaultMessage="Cancel" /></Button>

						</div>
					}
				</div>
			</div>
		);

	}

}

export default ModalMeta;

