'use strict';

import React, { Component } from 'react';
import { Input, Button, message } from 'antd';


class ModalMeta extends Component {

	constructor(props) {
		super(props);
		this.state = {
			edit: false,
			link: null,
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
		this.setState({ edit: false, link: null });
	}


	change(event) {
		this.setState({ link: event.target.value });
	}

	enter(event) {
		if ( event.key === 'Enter' ) {
			event.preventDefault();
			this.update();
		}
	}


	update() {
		if ( this.state.link === null || this.state.link == this.props.data.meta.link ) {
			return message.error('Please enter/update the link first');
		}

		this.props.mutate({
			card: this.props.data,
			variables: {
				id: this.props.data.id,
				meta: {
					link: this.state.link
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
					<div className="key">Link:</div>
					<div className="val">
						{ this.props.data.meta.link ?
							(
								<div className="full-width flex flex--sb">
									<div className="link">
										<a href={this.props.data.meta.link} target="_blank" rel="nofollow">{ this.props.data.meta.link }</a>
									</div>
								</div>
							) :
							( <p>Link not specified</p> )
						}
					</div>
				</div>
			);
		}


		return (
			<div className="component__key_val">
				<div className="key">Link:</div>
				<div className="val">
					{ ! this.state.edit && this.props.data.meta.link &&
						<div className="full-width flex flex--sb">
							<div className="link">
								<a href={this.props.data.meta.link} target="_blank" rel="nofollow">{ this.props.data.meta.link }</a>
							</div>
							<Button type="primary" ghost size="small" onClick={ this.open } className="m-l-10">{ this.props.data.meta.link ? 'Update Link' : 'Add Link' }</Button>
						</div>
					}

					{ ! this.state.edit && ! this.props.data.meta.link &&
						<Button type="primary" ghost size="small" onClick={ this.open }>Add Link</Button>
					}

					{ this.state.edit &&
						<div className="data--edit--inline flex row nowrap">
							<Input
								placeholder="Link URL"
								defaultValue={ this.props.data.meta.link }
								onChange={ this.change }
								onKeyPress={ this.enter }
								autoFocus={ true }
							/>
							<Button
								type="primary"
								size="small"
								className="m-l-10"
								onClick={ this.update }>{ this.props.data.meta.link ? 'Update' : 'Add' }</Button>
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

export default ModalMeta;

