'use strict';

import React, { Component } from 'react';
import { Input, Button, message } from 'antd';
import { FormattedMessage } from 'react-intl';
import translate from 'app/global/helper/translate';


class ModalMetaImage extends Component {

	constructor(props) {
		super(props);
		this.state = {
			edit: false,
			image: null,
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
		this.setState({ edit: false, image: null });
	}


	change(event) {
		this.setState({ image: event.target.value });
	}

	enter(event) {
		if ( event.key === 'Enter' ) {
			event.preventDefault();
			this.update();
		}
	}


	update() {
		if ( this.state.image === null || this.state.image == this.props.data.meta.image ) {
			return message.error( translate('messages.card.image.error') );
		}

		this.props.mutate({
			card: this.props.data,
			variables: {
				id: this.props.data.id,
				meta: {
					image: this.state.image
				}
			}
		})
		.then( res => {
			this.setState({ edit: false, image: null });
		});

	}




	render() {


		if ( this.props.public ) {
			return (
				<div className="component__key_val">
					<div className="key"><FormattedMessage id="card.meta.image.title" defaultMessage="Image" />:</div>
					<div className="val">
						{ this.props.data.meta.image ?
							(
								<div className="full-width flex flex--sb">
									<div className="link">
										<a href={this.props.data.meta.image} target="_blank" rel="nofollow">{ this.props.data.meta.image }</a>
									</div>
								</div>
							) :
							( <p><FormattedMessage id="card.meta.image.empty" defaultMessage="Image not specified" /></p> )
						}
					</div>
				</div>
			);
		}


		return (
			<div className="component__key_val">
				<div className="key"><FormattedMessage id="card.meta.image.title" defaultMessage="Image" />:</div>
				<div className="val">
					{ ! this.state.edit && this.props.data.meta.image &&
						<div className="full-width flex flex--sb">
							<div className="link">
								<a href={this.props.data.meta.image} target="_blank" rel="nofollow">{ this.props.data.meta.image }</a>
							</div>
							<Button type="primary" ghost size="small" onClick={ this.open } className="m-l-10">{ this.props.data.meta.image ? <FormattedMessage id="card.meta.image.update" defaultMessage="Update Image URL" /> : <FormattedMessage id="card.meta.image.add" defaultMessage="Add Image URL" /> }</Button>
						</div>
					}

					{ ! this.state.edit && ! this.props.data.meta.image &&
						<Button type="primary" ghost size="small" onClick={ this.open }><FormattedMessage id="card.meta.image.add" defaultMessage="Add Image URL" /></Button>
					}

					{ this.state.edit &&
						<div className="data--edit--inline flex row nowrap">
							<Input
								placeholder={ translate('card.meta.image.placeholder', 'Image URL') }
								defaultValue={ this.props.data.meta.image }
								onChange={ this.change }
								onKeyPress={ this.enter }
								autoFocus={ true }
							/>
							<Button
								type="primary"
								size="small"
								className="m-l-10"
								onClick={ this.update }>{ this.props.data.meta.image ? <FormattedMessage id="form.update" defaultMessage="Update" /> : <FormattedMessage id="form.add" defaultMessage="Add" /> }</Button>
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

export default ModalMetaImage;

